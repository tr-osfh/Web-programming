package org.example.controller;

import jakarta.ejb.Stateless;
import jakarta.inject.Inject;
import jakarta.ws.rs.container.AsyncResponse;
import jakarta.ws.rs.container.Suspended;
import org.example.dto.PointRequest;
import org.example.dto.PointResponse;
import org.example.entity.User;
import org.example.service.PointService;
import jakarta.ejb.EJB;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.Response;
import org.example.service.PollingSingleton;

import java.util.Map;
import java.util.concurrent.TimeUnit;

@Path("/points")
@Produces({"application/json"})
public class PointController {

    @Inject
    private PointService pointService;

    @Inject
    private PollingSingleton pollingSingleton;

    @POST
    @Consumes({"application/json"})
    public Response addPoint(PointRequest request, @Context HttpServletRequest httpRequest) {

        HttpSession session = httpRequest.getSession(false);
        if (session == null || session.getAttribute("user") == null) {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }

        User user = (User) session.getAttribute("user");

        try {
            PointResponse pr = pointService.addPoint(request, user);

            if (pr.isSuccess()) {
                if (pr.getPointList() != null){
                    UpdateWebSocket.sendToAll(pr.getPointList());
                }

                return Response.status(Response.Status.OK).entity(Map.of("x", pr.getX(), "y", pr.getY(), "r", pr.getR(), "result", pr.isResult(), "message", pr.getMessage())).build();
            } else {
                return Response.status(500).entity(Map.of("message", "Внутренняя ошибка сервера")).build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(500).entity(Map.of("message", "Внутренняя ошибка сервера")).build();
        }
    }

    @DELETE
    public Response deletePoints(@Context HttpServletRequest httpServletRequest) {
        HttpSession session = httpServletRequest.getSession();

        if (session == null || session.getAttribute("user") == null) {
            return Response.status(Response.Status.FORBIDDEN).build();
        }
        User user = (User) session.getAttribute("user");

        try {
            PointResponse pr = pointService.deleteUserPoints(user);
            if (pr.isSuccess()) {
                UpdateWebSocket.sendToAll(pr.getPointList());
                return Response.status(Response.Status.OK).entity(Map.of("message", pr.getMessage())).build();
            } else {
                return Response.status(500).entity(Map.of("message", "Внутренняя ошибка сервера")).build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(500).entity(Map.of("message", "Внутренняя ошибка сервера")).build();
        }
    }

}