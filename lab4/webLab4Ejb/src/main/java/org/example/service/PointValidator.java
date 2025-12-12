package org.example.service;

import jakarta.ejb.Stateless;

import java.math.BigDecimal;
import java.util.List;

@Stateless
public class PointValidator {
    private final List<Float> acceptableXR = List.of(-4f, -3f, -2f, -1f, 0f, 1f, 2f, 3f, 4f);

    public boolean validate(Float x, BigDecimal y, Float r, String source){
    if (source.contains("form")){
        if (y.compareTo(BigDecimal.valueOf(-3)) < 0 || y.compareTo(BigDecimal.valueOf(3)) > 0){
            return false;
        }

        if (!acceptableXR.contains(x) || !acceptableXR.contains(r)){
            return false;
        }
        return y.compareTo(BigDecimal.valueOf(3)) <= 0 && y.compareTo(BigDecimal.valueOf(-3)) >= 0;
    } else if (source.contains("graph")) {
        if (x >= 6f || x <= -6f){
            return false;
        }
        if (y.compareTo(BigDecimal.valueOf(6)) >= 0 || y.compareTo(BigDecimal.valueOf(-6)) <= 0){
            return false;
        }
        return acceptableXR.contains(r);
    } else {
        return false;
    }
    }

}
