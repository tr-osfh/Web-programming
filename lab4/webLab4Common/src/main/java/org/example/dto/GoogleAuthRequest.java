package org.example.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Map;

public class GoogleAuthRequest {

    @JsonProperty("access_token")
    private String accessToken;

    @JsonProperty("username")
    private String username;

    public GoogleAuthRequest() {}

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}