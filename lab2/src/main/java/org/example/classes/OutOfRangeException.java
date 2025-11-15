package org.example.classes;

import java.util.ArrayList;

public class OutOfRangeException extends RuntimeException {
    public OutOfRangeException(ArrayList<String> cords) {
        super(cords.size() == 1 ?
                "Координата " + cords.get(0) + " выходит за ограничения!" :
                "Координаты " + String.join(" и ", cords) + " выходят за ограничения!");
    }
}