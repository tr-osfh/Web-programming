package org.example.repository;

import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.example.dto.RegisterResponse;
import org.example.entity.User;

@Stateless
public class UserRepository {
    @PersistenceContext(unitName = "myAppDB")
    private EntityManager em;

    public User getUser(String login){
        try {
            CriteriaBuilder cb = em.getCriteriaBuilder();
            CriteriaQuery<User> query = cb.createQuery(User.class);
            Root<User> root = query.from(User.class);
            query.select(root).where(cb.equal(root.get("login"), login));

            return em.createQuery(query).getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }

    public boolean isInBase(String login){

        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Long> query = cb.createQuery(Long.class);
        Root<User> userRoot = query.from(User.class);

        Predicate predicate = cb.equal(userRoot.get("login"), login);

        Long count = em.createQuery(query.select(cb.count(userRoot)).where(predicate)).getSingleResult();

        return (count > 0);
    }

    public void addUser(User user){
        em.persist(user);

        em.flush();
    }
}
