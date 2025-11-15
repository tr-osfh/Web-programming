package org.example;

import org.example.classes.NullValueException;
import org.example.classes.OutOfRangeException;
import org.example.classes.Validator;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;

@WebServlet("/controller")
public class ControllerServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String xStr = req.getParameter("x").replace(',', '.');
        String yStr = req.getParameter("y").replace(',', '.');
        String rStr = req.getParameter("r").replace(',', '.');
        String sourceStr = req.getParameter("source");

        ArrayList<String> nulls = Validator.isAnyNull(xStr, yStr, rStr, sourceStr);
        if (!nulls.isEmpty()) {
            throw new NullValueException(nulls);
        }


            BigDecimal x = new BigDecimal(xStr);
            BigDecimal y = new BigDecimal(yStr);
            BigDecimal r = new BigDecimal(rStr);

            ArrayList<String> errors = Validator.validate(x, y, r, sourceStr);
            if (!errors.isEmpty()){
                throw new OutOfRangeException(errors);
            }

            req.setAttribute("x", x);
            req.setAttribute("y", y);
            req.setAttribute("r", r);
            req.setAttribute("source", sourceStr);

            req.getRequestDispatcher("/areaCheck").forward(req, resp);


    }
}
