package org.example.service;

import jakarta.ejb.EJB;
import jakarta.ejb.Stateless;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.PersistenceException;
import org.example.dto.*;
import org.example.entity.Point;
import org.example.entity.User;
import org.example.repository.UserRepository;


import java.util.logging.Logger;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Stateless
public class AuthService {

    @EJB
    private UserRepository userRepository;

    @EJB
    private PollingSingleton pollingSingleton;


    @EJB
    private PointService pointService;

    @EJB
    private UniqueUserService uss;

    private static final Logger logger = Logger.getLogger(AuthService.class.getName());

    public AuthResponse auth(AuthRequest request){


        try {
            User user = userRepository.getUser(request.getLogin());

            if (user == null) {
                return new AuthResponse(false, "Проверьте Login или Password");
            }

            if (uss.isAlreadyLogined(user)){
                return new AuthResponse(false, "Пользователь уже авторизован");
            }

            String inputPasswordHash = Encoder.hashPassword(request.getPassword(), user.getSalt());
            String storedPasswordHash = user.getPasswordHash();

            if (storedPasswordHash.equals(inputPasswordHash)) {

                List<Point> points = pointService.getPoints();

                String jsonPoints = convertToJson(points);

                uss.addUser(user);

                return new AuthResponse(true, "Успешно зашел в аккаунт.", user.getLogin(), user, jsonPoints);

            } else {
                return new AuthResponse(false, "Проверьте Login или Password");
            }

        } catch (Exception e){
            e.printStackTrace();
            return new AuthResponse(false, "Проверьте Login или Password");
        }
    }

    public RegisterResponse register(AuthRequest request){

        try {
            if (request == null) {
                return new RegisterResponse(false, "Отсутствуют данные для регистрации");
            }

            String login = request.getLogin();
            if (login == null || login.trim().isEmpty()) {
                return new RegisterResponse(false, "Логин не может быть пустым");
            }

            if (userRepository.isInBase(request.getLogin())) {
                return new RegisterResponse(false, "Пользователь уже существует");
            }


            User user = new User();
            String salt = Encoder.generateSalt();
            user.setLogin(request.getLogin());
            user.setSalt(salt);

            String passwordHash = Encoder.hashPassword(request.getPassword(), salt);
            user.setPasswordHash(passwordHash);

            userRepository.addUser(user);

            return new RegisterResponse(true, "пользователь успешно добавлен");

        } catch (EntityExistsException e) {

            return new RegisterResponse(false, "Пользователь уже существует");

        } catch (PersistenceException e) {
            return new RegisterResponse(false, "Ошибка базы данных при регистрации");

        } catch (IllegalArgumentException e) {
            return new RegisterResponse(false, "Некорректные данные пользователя");

        } catch (NullPointerException e) {
            return new RegisterResponse(false, "Отсутствуют необходимые данные");

        } catch (Exception e) {
            return new RegisterResponse(false, "Внутренняя ошибка сервера");
        }
    }

    public void logout(User user){

        uss.removeUser(user);

    }

    public GoogleAuthResponse authWithGoogle(GoogleAuthRequest request){
        String name = request.getUsername();


        User user = userRepository.getUser(name);

        if (user == null) {
            user = new User();
            user.setLogin(name);

            userRepository.addUser(user);
        }

        if (uss.isAlreadyLogined(user)){
            return new GoogleAuthResponse(false, "Пользователь уже авторизован");
        }

        uss.addUser(user);

        List<Point> points = pointService.getPoints();

        String jsonPoints = convertToJson(points);

        Map<String, Object> responseData = new HashMap<>();
        responseData.put("success", true);
        responseData.put("message", "Успешная аутентификация через Google");

        Map<String, Object> userData = new HashMap<>();
        userData.put("login", user.getLogin());

        responseData.put("user", userData);

        return new GoogleAuthResponse(true, user, responseData, jsonPoints);
    }

    private String convertToJson(List<Point> points) {
        StringBuilder json = new StringBuilder("[");
        for (int i = 0; i < points.size(); i++) {
            Point p = points.get(i);
            json.append("{\"id\":").append(p.getId())
                    .append(",\"x\":").append(p.getX())
                    .append(",\"y\":").append(p.getY())
                    .append(",\"r\":").append(p.getR())
                    .append(",\"result\":").append(p.isResult())
                    .append("}");
            if (i < points.size() - 1) {
                json.append(",");
            }
        }
        json.append("]");
        return json.toString();
    }

}
