package org.example.repo;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedProperty;
import org.example.models.HitResult;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@ManagedBean(name="hitRepository")
@ApplicationScoped
public class HitRepository implements Serializable {

    private static final String getAllHits = "select * from hitresults order by id desc";
    private static final String addHit = "insert into hitresults (x, y, r, result) values (?, ?, ?, ?)";
    private static final String clearHits = "DELETE FROM hitresults";

    @ManagedProperty(value = "#{dbManager}")
    private DataBaseManager dbManager;

    public List<HitResult> getHitResults() {
        List<HitResult> results = new ArrayList<>();
        try (Connection connection = dbManager.getConnection();
             PreparedStatement statement = connection.prepareStatement(getAllHits)) {
            ResultSet resultSet = statement.executeQuery();
            while (resultSet.next()) {
                HitResult hitResult = new HitResult();
                hitResult.setId(resultSet.getInt("id"));
                hitResult.setX(resultSet.getBigDecimal("x"));
                hitResult.setY(resultSet.getBigDecimal("y"));
                hitResult.setR(resultSet.getDouble("r"));
                hitResult.setResult(resultSet.getBoolean("result"));
                hitResult.setSavedInDb(true);
                results.add(0, hitResult);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return results;
    }

    public HitResult addHit(HitResult hitResult){
        try(Connection connection = dbManager.getConnection();
        PreparedStatement statement = connection.prepareStatement(addHit, new String[]{"id"})){
            statement.setBigDecimal(1, hitResult.getX());
            statement.setBigDecimal(2, hitResult.getY());
            statement.setDouble(3, hitResult.getR());
            statement.setBoolean(4, hitResult.isResult());
            statement.executeUpdate();

            ResultSet generatedKeys = statement.getGeneratedKeys();
            if (generatedKeys.next()){
                hitResult.setId(generatedKeys.getInt(1));
            }
            return hitResult;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public void clearHits(){
        try (Connection connection = dbManager.getConnection();
            PreparedStatement statement = connection.prepareStatement(clearHits);
        ) {
            statement.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public DataBaseManager getDbManager() {
        return dbManager;
    }

    public void setDbManager(DataBaseManager dbManager) {
        this.dbManager = dbManager;
    }
}
