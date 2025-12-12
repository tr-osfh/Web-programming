package org.example.service;

import jakarta.ejb.Singleton;
import jakarta.ws.rs.container.AsyncResponse;
import java.util.ArrayList;
import java.util.List;

@Singleton
public class PollingSingleton {

    private final List<AsyncResponse> waitingResponses = new ArrayList<>();

    private String lastData = "[]";

    public synchronized void addResponse(AsyncResponse response) {
        waitingResponses.add(response);
    }

    public synchronized void removeResponse(AsyncResponse response) {
        waitingResponses.remove(response);
    }

    public synchronized void notifyAllResponses(String newData) {
        this.lastData = newData;

        for (AsyncResponse response : waitingResponses) {
            if (!response.isDone()) {
                response.resume(newData);
            }
        }

        waitingResponses.clear();
    }

    public synchronized String getLastData() {
        return lastData;
    }

    public synchronized int getWaitingCount() {
        return waitingResponses.size();
    }
}