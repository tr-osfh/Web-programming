package org.example.repo;


import javax.annotation.Resource;
import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

@ManagedBean(name = "dbManager")
@ApplicationScoped
public class DataBaseManager {

    private DataSource dataSource;

    public DataBaseManager() {
        try {
            javax.naming.InitialContext ctx = new javax.naming.InitialContext();
            dataSource = (DataSource) ctx.lookup("java:/Lab3DB");
        } catch (javax.naming.NamingException e) {
            throw new RuntimeException(e);
        }
    }

    public Connection getConnection() throws SQLException {
        return dataSource.getConnection();
    }
}