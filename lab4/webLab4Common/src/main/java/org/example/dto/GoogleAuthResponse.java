package org.example.dto;

import org.example.entity.User;

import java.util.Map;

public class GoogleAuthResponse {
    private User user;
    private Map<String, Object> userData;
    private boolean success;
    private String message;
    private String points;


    public GoogleAuthResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public GoogleAuthResponse(boolean success, String message, String points) {
        this.success = success;
        this.message = message;
        this.points = points;
    }

    public GoogleAuthResponse(boolean success, User user, Map<String, Object> userData, String points) {
        this.success = success;
        this.user = user;
        this.userData = userData;
        this.points = points;
    }

    public GoogleAuthResponse() {
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

    public Map<String, Object> getUserData() {
        return userData;
    }

    public void setUserData(Map<String, Object> userData) {
        this.userData = userData;
    }

    public String getPoints() {
        return points;
    }

    public void setPoints(String points) {
        this.points = points;
    }
}
