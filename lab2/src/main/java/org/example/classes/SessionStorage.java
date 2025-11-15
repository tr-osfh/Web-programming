package org.example.classes;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;

public class SessionStorage {

    public static void add(Result result, HttpSession session) {
        ArrayList<Result> storage = getStorage(session);
        storage.add(0, result);
        session.setAttribute("savedResults", storage);
    }

    public static Result receive(HttpSession session) {
        ArrayList<Result> storage = getStorage(session);
        if (storage.isEmpty()) return null;
        return storage.get(0);
    }

    public static ArrayList<Result> getList(HttpSession session) {
        return getStorage(session);
    }

    public static void clear(HttpSession session) {
        session.setAttribute("savedResults", new ArrayList<Result>());
    }

    private static ArrayList<Result> getStorage(HttpSession session) {
        ArrayList<Result> storage = (ArrayList<Result>) session.getAttribute("savedResults");
        if (storage == null) {
            storage = new ArrayList<>();
            session.setAttribute("savedResults", storage);
        }
        return storage;
    }
}