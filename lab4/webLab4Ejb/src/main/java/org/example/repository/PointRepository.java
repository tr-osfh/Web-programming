package org.example.repository;

import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaDelete;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import org.example.entity.Point;

import java.util.ArrayList;
import java.util.List;

@Stateless
public class PointRepository {

    @PersistenceContext(unitName = "myAppDB")
    private EntityManager em;


    public List<Point> getPoints(){
        try {
            CriteriaBuilder cb = em.getCriteriaBuilder();
            CriteriaQuery<Point> query = cb.createQuery(Point.class);
            Root<Point> root = query.from(Point.class);

            query.select(root);

            List<Point> pointsList = em.createQuery(query).getResultList();

            em.flush();

            return pointsList;
        } catch (Exception e){
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    public void addPoint(Point point){
        em.persist(point);
        em.flush();
    }

    public void deleteUserPoints(Long login){
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaDelete<Point> delete = cb.createCriteriaDelete(Point.class);
        Root<Point> root = delete.from(Point.class);
        delete.where(cb.equal(root.get("user").get("userId"), login));

        em.createQuery(delete).executeUpdate();

        em.flush();
    }
}
