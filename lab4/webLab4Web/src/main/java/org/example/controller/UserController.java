package org.example.controller;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import jakarta.ejb.Stateless;
import jakarta.inject.Inject;
import org.example.dto.*;
import org.example.entity.User;
import org.example.service.AuthService;
import jakarta.ejb.EJB;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.NewCookie;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.Response.Status;

import java.util.Map;

@Path("/users")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserController {
    @Inject
    private AuthService authService;

    private GoogleIdTokenVerifier verifier;

    @POST
    @Path("/users")
    public Response register(AuthRequest request) {
        try {
            RegisterResponse rr = this.authService.register(request);
            return rr.isSuccess() ? Response.status(Status.CREATED).entity(Map.of("message", rr.getMessage())).build() : Response.status(Status.BAD_REQUEST).entity(Map.of("message", rr.getMessage())).build();
        } catch (Exception var3) {
            var3.printStackTrace();
            return Response.status(500).build();
        }
    }

    @POST
    @Path("/sessions")
    public Response auth(AuthRequest request, @Context HttpServletRequest httpRequest) {
        try {
            AuthResponse ar = this.authService.auth(request);

            if (ar.getUser() != null){
                HttpSession session = httpRequest.getSession(true);
                session.setAttribute("user", ar.getUser());
                session.setMaxInactiveInterval(30 * 60);
            }

            if (ar.getPoints() != null){
                new Thread(() -> {
                    try {
                        Thread.sleep(1000);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                    UpdateWebSocket.sendToAll(ar.getPoints());
                }).start();
            }

            return ar.isSuccess() ? Response.status(Status.OK).entity(Map.of("message", ar.getMessage(), "user", ar.getUsername())).build() : Response.status(Status.FORBIDDEN).entity(Map.of("message", ar.getMessage())).build();
        } catch (Exception var3) {
            var3.printStackTrace();
            return Response.status(500).build();
        }
    }

    @DELETE
    @Path("/sessions")
    public Response logout(@Context HttpServletRequest httpServletRequest) {
        HttpSession session = httpServletRequest.getSession(false);

        if (session != null) {
            User user = (User) session.getAttribute("user");
            authService.logout(user);

            session.invalidate();
        }

        NewCookie logoutCookie = new NewCookie("JSESSIONID", "", "/", null, 0, "", 0, false);




        return Response.status(Status.OK)
                .entity(Map.of("message", "Logout successful"))
                .cookie(logoutCookie)
                .build();
    }

    @POST
    @Path("/auth/google")
    public Response googleAuth(GoogleAuthRequest request,
                               @Context HttpServletRequest httpRequest) {

        try {

            if (request.getUsername() == null) {
                return Response.status(Status.BAD_REQUEST)
                        .entity(Map.of("error", "Не получена информация о пользователе"))
                        .build();
            }

            GoogleAuthResponse gar = authService.authWithGoogle(request);

            if (gar.getUser() != null){
                HttpSession session = httpRequest.getSession(true);
                session.setAttribute("user", gar.getUser());
                session.setMaxInactiveInterval(30 * 60);
            }
            if (gar.isSuccess()){
                if (gar.getPoints() != null){
                    new Thread(() -> {
                        try {
                            Thread.sleep(1000);
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                        UpdateWebSocket.sendToAll(gar.getPoints());
                    }).start();
                }
                return Response.ok(gar.getUserData()).build();
            } else {
                return Response.status(400).entity(Map.of("message", gar.getMessage())).build();
            }

        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(Status.INTERNAL_SERVER_ERROR)
                    .entity(Map.of("error", "Внутренняя ошибка сервера: " + e.getMessage()))
                    .build();
        }
    }
}
