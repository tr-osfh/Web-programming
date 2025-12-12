package org.example.dto;

import org.example.entity.Point;

import java.math.BigDecimal;
import java.util.List;

public class PointResponse {
    private Float x;
    private BigDecimal y;
    private Float r;
    private boolean result;
    private String message;
    private boolean success;
    private Point[] points;
    private String pointList;

    public PointResponse(String message, boolean success, String points){
        this.message = message;
        this.success = success;
        this.pointList = points;
    }

    public PointResponse(String message, boolean success){
        this.message = message;
        this.success = success;
    }

    public PointResponse(String message, boolean success, Point[] points, String pointsString){
        this.message = message;
        this.success = success;
        this.points = points;
        this.pointList = pointsString;
    }

    public PointResponse(Float x, BigDecimal y, Float r, boolean result, String message, boolean success, String points) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.result = result;
        this.message = message;
        this.success = success;
        this.pointList = points;
    }

    public PointResponse(){}

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public Float getX() {
        return x;
    }

    public void setX(Float x) {
        this.x = x;
    }

    public BigDecimal getY() {
        return y;
    }

    public void setY(BigDecimal y) {
        this.y = y;
    }

    public Float getR() {
        return r;
    }

    public void setR(Float r) {
        this.r = r;
    }

    public boolean isResult() {
        return result;
    }

    public void setResult(boolean result) {
        this.result = result;

    }

    public String getPointList() {
        return pointList;
    }

    public void setPointList(String pointList) {
        this.pointList = pointList;
    }


    public Point[] getPoints() {
        return points;
    }

    public void setPoints(Point[] points) {
        this.points = points;
    }
}
