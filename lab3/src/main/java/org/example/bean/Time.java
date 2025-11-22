package org.example.bean;

import javax.annotation.PostConstruct;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ApplicationScoped;
import java.io.Serializable;
import java.time.LocalDateTime;;

@ManagedBean(name="timeBean")
@ApplicationScoped
public class Time implements Serializable {
    private LocalDateTime time = LocalDateTime.now();

    private String date;
    private Integer hour;
    private Integer minute;
    private Integer second;

    @PostConstruct
    public void init() {
        updateTime();
    }

    public void updateTime() {
        time = LocalDateTime.now();
        date = String.valueOf(time.getDayOfMonth()) + String.valueOf(time.getMonth()) + String.valueOf(time.getYear());
        hour = time.getHour() % 12 == 0 ? 12 : time.getHour() % 12;
        minute = time.getMinute();
        second = time.getSecond();

        System.out.println("Time updated: " + hour + ":" + minute + ":" + second + " Date: " + date);
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Integer getHour() {
        return hour;
    }

    public void setHour(Integer hour) {
        this.hour = hour;
    }

    public Integer getMinute() {
        return minute;
    }

    public void setMinute(Integer minute) {
        this.minute = minute;
    }

    public Integer getSecond() {
        return second;
    }

    public void setSecond(Integer second) {
        this.second = second;
    }
}
