package org.example.classes;

import java.math.BigDecimal;

public class Checker {

    public static boolean check(BigDecimal x, BigDecimal y, BigDecimal r) {

        if (x.compareTo(BigDecimal.ZERO) >= 0 && y.compareTo(BigDecimal.ZERO) >= 0) {
            return x.multiply(x).add(y.multiply(y)).compareTo(r.multiply(r)) <= 0;
        }

        else if (x.compareTo(BigDecimal.ZERO) <= 0 && y.compareTo(BigDecimal.ZERO) <= 0) {
            return y.compareTo(new BigDecimal("-2").multiply(x).subtract(r)) >= 0 &&
                    x.compareTo(r.divide(new BigDecimal("2")).negate()) >= 0 &&
                    y.compareTo(r.negate()) >= 0;
        }

        else if (x.compareTo(BigDecimal.ZERO) <= 0 && y.compareTo(BigDecimal.ZERO) >= 0) {
            return y.compareTo(r.divide(new BigDecimal("2"))) <= 0 &&
                    x.compareTo(r.negate()) >= 0;
        }

        else {
            return false;
        }
    }
}

