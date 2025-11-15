package org.example.classes;

import java.math.BigDecimal;

public record Result(BigDecimal x, BigDecimal y, BigDecimal r, boolean value) {

    @Override
    public String toString(){
        return ("{\"x\":\"" + x + "\", " +
                "\"y\":\"" + y + "\", " +
                "\"r\":\"" + r + "\", " +
                "\"value\":\"" + value + "\"}");
    }

    public BigDecimal getX() {
        return x;
    }

    public BigDecimal getY() {
        return y;
    }

    public BigDecimal getR() {
        return r;
    }

    public boolean getValue(){
        return value;
    }
}
