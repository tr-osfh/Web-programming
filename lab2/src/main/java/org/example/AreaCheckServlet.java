package org.example;

import org.example.classes.*;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;


@WebServlet("/areaCheck")
public class AreaCheckServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try{
        BigDecimal x = (BigDecimal) req.getAttribute("x");
        BigDecimal y = (BigDecimal) req.getAttribute("y");
        BigDecimal r = (BigDecimal) req.getAttribute("r");
        String source = (String) req.getAttribute("source");

            boolean value = Checker.check(x, y, r);

            req.setAttribute("x", x);
            req.setAttribute("y", y);
            req.setAttribute("r", r);
            req.setAttribute("value", value);

            Result result = new Result(x, y, r, value);
            SessionStorage.add(result, req.getSession());

            if ("form".equals(source)){
                req.getRequestDispatcher("./result.jsp").forward(req, resp);
            } else {
                resp.setContentType("application/json");
                resp.setCharacterEncoding("UTF-8");

                String json = String.format(
                        "{\"x\": %s, \"y\": %s, \"r\": %s, \"result\": %s}",
                        x, y, r, value
                );
                resp.getWriter().write(json);
            }


        } catch (Exception e) {
            resp.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }
}
