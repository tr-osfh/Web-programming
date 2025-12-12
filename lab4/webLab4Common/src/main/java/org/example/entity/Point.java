package org.example.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table
public class Point {
    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false)
    private Float x;

    @Column(nullable = false)
    private String y;

    @Column(nullable = false)
    private Float r;

    @Column(nullable = false)
    private boolean result;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "user_id")
    private User user;

    public Point(Long id, Float x, BigDecimal y, Float r, boolean result) {
        this.id = id;
        this.x = x;
        this.y = String.valueOf(y);
        this.r = r;
        this.result = result;
    }

    public Point(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getX() {
        return x;
    }

    public void setX(Float x) {
        this.x = x;
    }

    public BigDecimal getY() {
        return new BigDecimal(y);
    }

    public void setY(BigDecimal y) {
        this.y = String.valueOf(y);
    }

    public Float getR() {
        return r;
    }

    public void setR(Float r) {
        this.r = r;
    }

    public boolean isResult() {
        return result;
    }

    public void setResult(boolean result) {
        this.result = result;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
