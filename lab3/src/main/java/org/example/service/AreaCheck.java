package org.example.service;

import org.example.models.HitResult;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@ManagedBean(name = "areaCheck")
@ApplicationScoped
public class AreaCheck implements Serializable {

    public AreaCheck() {
        possibleX.add(BigDecimal.valueOf(-4));
        possibleX.add(BigDecimal.valueOf(-3));
        possibleX.add(BigDecimal.valueOf(-2));
        possibleX.add(BigDecimal.valueOf(-1));
        possibleX.add(BigDecimal.ZERO);
        possibleX.add(BigDecimal.valueOf(1));
        possibleX.add(BigDecimal.valueOf(2));

        possibleR.add(1.0d);
        possibleR.add(1.5d);
        possibleR.add(2.0d);
        possibleR.add(2.5d);
        possibleR.add(3.0d);
    }

    private List<BigDecimal> possibleX = new ArrayList<BigDecimal>();
    private List<Double> possibleR = new ArrayList<>();

    public void check(HitResult hitResult) {
        boolean hit = isInArea(hitResult);
        hitResult.setResult(hit);
    }

    public boolean validate(BigDecimal x, BigDecimal y, Double r){
        return possibleX.contains(x) && y.compareTo(BigDecimal.valueOf(-5)) >= 0 && y.compareTo(BigDecimal.valueOf(5)) <= 0 && possibleR.contains(r);
    }

    private boolean isInArea(HitResult hitResult){
        BigDecimal x = hitResult.getX();
        BigDecimal y = hitResult.getY();
        double r = hitResult.getR();

        if (x.compareTo(BigDecimal.ZERO) <= 0 && y.compareTo(BigDecimal.ZERO) >= 0){
            return x.multiply(x).add(y.multiply(y)).compareTo(BigDecimal.valueOf(r * r)) <= 0;
        } else if(x.compareTo(BigDecimal.ZERO) >= 0 && y.compareTo(BigDecimal.ZERO) >= 0){
            return x.compareTo(BigDecimal.valueOf(r / 2)) <= 0 && y.compareTo(BigDecimal.valueOf(r)) <= 0;
        } else if(x.compareTo(BigDecimal.ZERO) >= 0 && y.compareTo(BigDecimal.ZERO) <= 0){
            return y.compareTo(x.multiply(BigDecimal.valueOf(2)).subtract(BigDecimal.valueOf(r))) >= 0;
        } else {
            return false;
        }
    }
}
