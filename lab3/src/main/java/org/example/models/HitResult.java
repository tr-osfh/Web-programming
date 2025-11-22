package org.example.models;


import java.io.Serializable;
import java.math.BigDecimal;

public class HitResult implements Serializable {

    public HitResult() {
    }

    public HitResult(BigDecimal x, BigDecimal y, Double r){
        this.x = x;
        this.y = y;
        this.r = r;
    }

    private int id;

    private BigDecimal x;

    private BigDecimal y;

    private Double r;

    private boolean result;

    private boolean savedInDb = false;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public BigDecimal getX() {
        return x;
    }

    public void setX(BigDecimal x) {
        this.x = x;
    }

    public BigDecimal getY() {
        return y;
    }

    public void setY(BigDecimal y) {
        this.y = y;
    }

    public Double getR() {
        return r;
    }

    public void setR(Double r) {
        this.r = r;
    }

    public boolean isResult() {
        return result;
    }

    public void setResult(boolean result) {
        this.result = result;
    }

    public boolean getSavedInDb() {
        return savedInDb;
    }

    public void setSavedInDb(boolean savedInDb) {
        this.savedInDb = savedInDb;
    }

    @Override
    public String toString() {
        return "Attempt{" +
                "id=" + id +
                ", x=" + x +
                ", y=" + y +
                ", r=" + r +
                ", result=" + result +
                '}';
    }
}
