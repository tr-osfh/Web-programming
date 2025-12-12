package org.example.dto;

import org.example.entity.User;

public class AuthResponse {
    private boolean success;
    private String message;
    private String username;
    private User user;
    private String points;

    public AuthResponse(boolean success, String message, String username, User user){
        this.success = success;
        this.message = message;
        this.username = username;
        this.user = user;
    }

    public AuthResponse(boolean success, String message, String username, User user, String points){
        this.success = success;
        this.message = message;
        this.username = username;
        this.user = user;
        this.points = points;
    }


    public AuthResponse(boolean success, String message){
        this.success = success;
        this.message = message;
    }


    public String getUsername() {
        return username;
    }

    public void setUsername(String user) {
        this.username = user;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getPoints() {
        return points;
    }

    public void setPoints(String points) {
        this.points = points;
    }
}
