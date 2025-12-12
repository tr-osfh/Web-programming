package org.example.filter;

import jakarta.ws.rs.ApplicationPath;
import jakarta.ws.rs.core.Application;
import org.example.controller.PointController;
import org.example.controller.UserController;

import java.util.HashSet;
import java.util.Set;

@ApplicationPath("/api")
public class JaxRsActivator extends Application {
    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> classes = new HashSet<>();
        classes.add(PointController.class);
        classes.add(UserController.class);
        return classes;
    }
}