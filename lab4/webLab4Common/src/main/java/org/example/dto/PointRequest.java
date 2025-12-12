package org.example.dto;

import java.math.BigDecimal;

public class PointRequest {
    private String x;
    private String y;
    private String r;
    private String source;


    public PointRequest(String x, String y, String r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    public PointRequest(){}

    public Float getX() {
        return Float.parseFloat(x);
    }

    public void setX(Float x) {
        this.x = String.valueOf(x);
    }

    public BigDecimal getY() {
        return new BigDecimal(y);
    }

    public void setY(BigDecimal y) {
        this.y = String.valueOf(y);
    }

    public Float getR() {
        return Float.parseFloat(r);
    }

    public void setR(Float r) {
        this.r = String.valueOf(r);
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }
}
