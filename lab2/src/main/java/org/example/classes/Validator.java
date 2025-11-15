package org.example.classes;

import java.math.BigDecimal;
import java.util.ArrayList;

public class Validator {

    public static ArrayList<String> isAnyNull(String x, String y, String r, String type){
        ArrayList<String> nulls = new ArrayList<>();

        if (x.isEmpty() || x.isBlank() || x == null) nulls.add("x");
        if (y.isEmpty() || y.isBlank() || y == null) nulls.add("y");
        if (r.isEmpty() || r.isBlank() || r == null) nulls.add("r");
        if (type.isEmpty() || type.isBlank() || type == null) nulls.add("type");

        return nulls;
    }

    public static ArrayList<String> validate(BigDecimal x, BigDecimal y, BigDecimal r, String type){
        ArrayList<String> errors = new ArrayList<>();
        if (!isInRange(r, 2, 5)) errors.add("r");
        if (type.equals("form")){
            if (!isInRange(x, -3, 5)) errors.add("x");
            if (!isInRange(y, -3, 3)) errors.add("y");
        } else {
            if (!isInRange(x, -6, 6)) errors.add("x");
            if (!isInRange(y, -6, 6)) errors.add("y");
        }
        return errors;
    }

    private static boolean isInRange(BigDecimal value, int min, int max) {
        return value.compareTo(BigDecimal.valueOf(min)) >= 0 &&
                value.compareTo(BigDecimal.valueOf(max)) <= 0;
    }
}
