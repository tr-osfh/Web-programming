package org.example.service;

import jakarta.ejb.Stateless;

import java.math.BigDecimal;

@Stateless
public class PointChecker {
    public boolean inArea(Float x, BigDecimal y, Float r){
        if (r == 0f){
            return false;
        }

        boolean isPositive = r >= 0f;
        r = Math.abs(r);
        if (isPositive){
            if (y.compareTo(BigDecimal.valueOf(0)) >= 0 && x >= 0){
                return (y.compareTo(BigDecimal.valueOf(r)) <= 0 && (x <= (r/2.0f)));
            } else if (y.compareTo(BigDecimal.valueOf(0)) <= 0 && x >= 0){
                return ((y.multiply(y).add(BigDecimal.valueOf(x * x))).compareTo(BigDecimal.valueOf(r * r))) <= 0;
            } else if (y.compareTo(BigDecimal.valueOf(0)) <= 0 && x <= 0){
                return (y.compareTo(BigDecimal.valueOf(-2f * x - r)) >= 0);
            } else {
                return false;
            }
        } else {
            if (x >= 0 && y.compareTo(BigDecimal.valueOf(0)) >= 0){
                return y.compareTo(BigDecimal.valueOf(-2f*x+r)) <= 0;
            } else if (x <= 0 && y.compareTo(BigDecimal.valueOf(0)) <= 0){
                return (x >= -r/2f && y.compareTo(BigDecimal.valueOf(-r)) >= 0);
            } else if (x <= 0 && y.compareTo(BigDecimal.valueOf(0)) >= 0) {
                return ((y.multiply(y).add(BigDecimal.valueOf(x * x))).compareTo(BigDecimal.valueOf(r * r))) <= 0;
            }
            return false;
        }

    }
}
