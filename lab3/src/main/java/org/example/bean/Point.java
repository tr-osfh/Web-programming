package org.example.bean;

import org.example.models.HitResult;
import org.example.service.HitService;

import javax.annotation.PostConstruct;
import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@ManagedBean(name = "pointBean")
@ApplicationScoped
public class Point implements Serializable {
    private BigDecimal clickX;
    private BigDecimal clickY;
    private Double clickR;

    private BigDecimal y;
    private Double r = 1.0;
    private List<BigDecimal> selectedX = new ArrayList<>();
    private boolean xMinus4Selected = false;
    private boolean xMinus3Selected = false;
    private boolean xMinus2Selected = false;
    private boolean xMinus1Selected = false;
    private boolean xZeroSelected = false;
    private boolean xPlus1Selected = false;
    private boolean xPlus2Selected = false;

    private List<HitResult> unsavedList = new ArrayList<>();

    @ManagedProperty(value = "#{hitService}")
    private HitService hitService;


    @PostConstruct
    public void init(){

    }

    public void submit() {
        onXSelectionChange();
        for (BigDecimal x : selectedX) {
            HitResult hitResult = hitService.processHit(x, y, r);
            if (hitResult != null) {
                unsavedList.add(0, hitResult);
            }
        }
        List<HitResult> dataBaseList = unsavedList;
        Thread thread = new Thread(() -> {
            hitService.saveHits(dataBaseList);
        });
        thread.start();
    }

    public void graphSubmit() {
        HitResult hitResult = hitService.processGraphHit(clickX, clickY, clickR);
        if (hitResult != null) {
            unsavedList.add(0, hitResult);
        }
        List<HitResult> dataBaseList = unsavedList;
        Thread thread = new Thread(() -> {
            hitService.saveHits(dataBaseList);
        });
        thread.start();
    }

    public void deleteAll() {
        unsavedList.clear();
    }

    public void reset(){
        xMinus1Selected = false;
        xMinus2Selected = false;
        xMinus3Selected = false;
        xMinus4Selected = false;
        xZeroSelected = false;
        xPlus1Selected = false;
        xPlus2Selected = false;
        y = null;
        r = 1.0;
    }

    public void getAllHitsDB() {
        unsavedList = hitService.getAllHitsFromDataBase();
    }

    public List<HitResult> getAllHits() {
        return unsavedList;
    }

    public void saveHits() {
        hitService.saveHits(unsavedList);
    }

    public void onXSelectionChange() {
        selectedX.clear();
        if (xMinus4Selected) selectedX.add(BigDecimal.valueOf(-4));
        if (xMinus3Selected) selectedX.add(BigDecimal.valueOf(-3));
        if (xMinus2Selected) selectedX.add(BigDecimal.valueOf(-2));
        if (xMinus1Selected) selectedX.add(BigDecimal.valueOf(-1));
        if (xZeroSelected) selectedX.add(BigDecimal.ZERO);
        if (xPlus1Selected) selectedX.add(BigDecimal.ONE);
        if (xPlus2Selected) selectedX.add(BigDecimal.valueOf(2));
    }

    public HitService getHitService() {
        return hitService;
    }

    public void setHitService(HitService hitService) {
        this.hitService = hitService;
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
        System.out.println(r);
        this.r = r;
    }

    public boolean isxMinus4Selected() {
        return xMinus4Selected;
    }

    public void setxMinus4Selected(boolean xMinus4Selected) {
        this.xMinus4Selected = xMinus4Selected;
    }

    public boolean isxMinus3Selected() {
        return xMinus3Selected;
    }

    public void setxMinus3Selected(boolean xMinus3Selected) {
        this.xMinus3Selected = xMinus3Selected;
    }

    public boolean isxMinus2Selected() {
        return xMinus2Selected;
    }

    public void setxMinus2Selected(boolean xMinus2Selected) {
        this.xMinus2Selected = xMinus2Selected;
    }

    public boolean isxMinus1Selected() {
        return xMinus1Selected;
    }

    public void setxMinus1Selected(boolean xMinus1Selected) {
        this.xMinus1Selected = xMinus1Selected;
    }

    public boolean isxZeroSelected() {
        return xZeroSelected;
    }

    public void setxZeroSelected(boolean xZeroSelected) {
        this.xZeroSelected = xZeroSelected;
    }

    public boolean isxPlus1Selected() {
        return xPlus1Selected;
    }

    public void setxPlus1Selected(boolean xPlus1Selected) {
        this.xPlus1Selected = xPlus1Selected;
    }

    public boolean isxPlus2Selected() {
        return xPlus2Selected;
    }

    public void setxPlus2Selected(boolean xPlus2Selected) {
        this.xPlus2Selected = xPlus2Selected;
    }

    public List<BigDecimal> getSelectedX() {
        return selectedX;
    }

    public void setSelectedX(List<BigDecimal> selectedX) {
        this.selectedX = selectedX;
    }

    public Double getClickR() {
        return clickR;
    }

    public void setClickR(Double clickR) {
        this.clickR = clickR;
    }

    public BigDecimal getClickY() {
        return clickY;
    }

    public void setClickY(BigDecimal clickY) {
        this.clickY = clickY;
    }

    public BigDecimal getClickX() {
        return clickX;
    }

    public void setClickX(BigDecimal clickX) {
        this.clickX = clickX;
    }
}
