package org.example.classes;

import java.util.ArrayList;

public class NullValueException extends RuntimeException {
    public NullValueException(ArrayList<String> cords) {
        super(cords.size() == 1 ?
                "Значение " + cords.get(0) + " не может быть пустым!" :
                "Значения " + String.join(", ", cords) + " не могут быть пустым!");
    }
}
