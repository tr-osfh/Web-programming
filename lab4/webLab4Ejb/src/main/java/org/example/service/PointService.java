package org.example.service;

import jakarta.ejb.EJB;
import jakarta.ejb.Stateless;
import org.example.dto.PointRequest;
import org.example.dto.PointResponse;
import org.example.entity.Point;
import org.example.entity.User;
import org.example.repository.PointRepository;

import java.math.BigDecimal;
import java.util.List;

@Stateless
public class PointService {

    @EJB
    PointRepository pointRepo;

    @EJB
    private PollingSingleton pollingSingleton;

    @EJB
    private PointValidator pointValidator;

    @EJB
    private PointChecker pointChecker;


    public List<Point> getPoints(){
        return pointRepo.getPoints();
    }

    public PointResponse addPoint(PointRequest request, User user){

        Float x = request.getX();
        BigDecimal y = request.getY();
        Float r = request.getR();
        String source = request.getSource();

        if (!pointValidator.validate(x, y, r, source)){
            return new PointResponse("Точки не прошли валидацию", false);
        }

        boolean isInArea = pointChecker.inArea(x, y, r);

        Point point = new Point();
        point.setX(x);
        point.setY(y);
        point.setR(r);
        point.setResult(isInArea);
        point.setUser(user);

        try {
            pointRepo.addPoint(point);

            List<Point> allPoints = this.getPoints();

            String jsonPoints = convertToJson(allPoints);

            return new PointResponse(x, y, r, isInArea, "Точка успешно добавлена", true, jsonPoints);
        } catch (Exception e) {
            e.printStackTrace();
            return new PointResponse("Ошибка при добавлении точки в базу", false);
        }
    }

    public PointResponse deleteUserPoints(User user){

        try {
            pointRepo.deleteUserPoints(user.getUserId());
            List<Point> allPoints = this.getPoints();

            String jsonPoints = convertToJson(allPoints);


            return new PointResponse("Данные удалены", true, jsonPoints);
        } catch (Exception e){
            e.printStackTrace();
            return new PointResponse("Ошибка в БД", false);
        }
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
