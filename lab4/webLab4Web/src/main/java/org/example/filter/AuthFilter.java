package org.example.filter;

import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;

@WebFilter("/*")
public class AuthFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        String path = httpRequest.getRequestURI();

        if (path.matches(".*\\.(js|css|png|jpg|gif|ico|svg|json|woff|woff2|ttf|eot|html)$")) {
            chain.doFilter(request, response);
            return;
        }

        if (path.contains("/api/users") || path.contains("/api/sessions") ||
                path.contains("/api/auth") || path.contains("/update")) {
            chain.doFilter(request, response);
            return;
        }


        if (path.startsWith("/webLab4/api/")) {
            HttpSession session = httpRequest.getSession(false);
            if (session == null || session.getAttribute("user") == null) {
                httpResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }
            chain.doFilter(request, response);
            return;
        }

        if (!path.contains(".") && !path.startsWith("/webLab4/api")) {
            request.getRequestDispatcher("/index.html").forward(request, response);
        } else {
            chain.doFilter(request, response);
        }
    }
}
