package org.example.service;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import jakarta.ejb.Lock;
import jakarta.ejb.LockType;
import jakarta.ejb.Singleton;
import jakarta.ejb.Startup;
import org.example.entity.User;

import java.util.ArrayList;
import java.util.List;

@Singleton
@Startup
public class UniqueUserService {
    private List<String> users;

    @PostConstruct
    public void init() {
        users = new ArrayList<>();
    }

    @Lock(LockType.READ)
    public boolean isAlreadyLogined(User user){
        return users.contains(user.getLogin());
    }

    @Lock(LockType.WRITE)
    public void addUser(User user){
        users.add(user.getLogin());
    }

    @Lock(LockType.WRITE)
    public void removeUser(User user){
        users.remove(user.getLogin());
    }

    @PreDestroy
    public void destroy(){
        users.clear();
    }
}
