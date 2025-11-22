package org.example.service;

import org.example.models.HitResult;
import org.example.repo.HitRepository;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@ManagedBean(name = "hitService")
@ApplicationScoped
public class HitService implements Serializable {

    @ManagedProperty(value = "#{areaCheck}")
    private AreaCheck areaCheck;

    @ManagedProperty(value = "#{hitRepository}")
    private HitRepository hitRepository;

    public HitResult processHit(BigDecimal x, BigDecimal y, Double r) {
        if (x == null || y == null || r == null) {
            return null;
        }
        if (areaCheck.validate(x, y, r)){
            HitResult hitResult = new HitResult(x, y, r);
            areaCheck.check(hitResult);
            return hitResult;
        }
        throw new RuntimeException("не допустимые значения!");
    }

    public HitResult processGraphHit(BigDecimal x, BigDecimal y, Double r) {
        if (x == null || y == null || r == null) {
            return null;
        }
        HitResult hitResult = new HitResult(x, y, r);
        areaCheck.check(hitResult);
        return hitResult;

    }


    public void saveHits(List<HitResult> hits) {
        if (hits.isEmpty()){
            hitRepository.clearHits();
            return;
        }
        hitRepository.clearHits();
        for (HitResult hitResult : hits) {
            hitResult.setSavedInDb(true);
            hitRepository.addHit(hitResult);
        }
    }

    public void clearHits() {
        hitRepository.clearHits();
    }

    public List<HitResult> getAllHitsFromDataBase() {
        return hitRepository.getHitResults();
    }

    public AreaCheck getAreaCheck() {
        return areaCheck;
    }

    public void setAreaCheck(AreaCheck areaCheck) {
        this.areaCheck = areaCheck;
    }

    public HitRepository getHitRepository() {
        return hitRepository;
    }

    public void setHitRepository(HitRepository hitRepository) {
        this.hitRepository = hitRepository;
    }
}
