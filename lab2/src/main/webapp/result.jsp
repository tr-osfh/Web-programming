<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="org.example.classes.Result" %>
<%@ page import="org.example.classes.SessionStorage" %>
<%@ page import="java.util.ArrayList" %>
<%@page errorPage="excellentException.jsp"%>
<html>
<style>
    <%@include file="style.css"%>

</style>
<head>
    <title>ЛАБА ДВА - Результат</title>
    <meta charset="UTF-8">
</head>
<body>
<header style="text-align: center">
    <div class="header">
        <h1>Лабораторная работа НОМЕР ДэВэАа</h1>
        <h2>Красногорский Тимофей, Р3220 <br>Вариант 2089</h2>
    </div>
</header>

<div class="result-container">
    <div class="table">
        <table cellspacing="4" cellpadding="15" width="100%">
            <caption>
                <b>Результаты</b>
            </caption>
            <tr>
                <th width="25%">Координата X</th>
                <th width="25%">Координата Y</th>
                <th width="25%">Параметр R</th>
                <th width="25%">Факт попадания в область</th>
            </tr>
        </table>
        <table id="result_table" cellspacing="4" cellpadding="15" width="100%">
                <%
                    HttpSession currentSession = request.getSession(false);
                    Result result = null;
                    if (currentSession != null) {
                        result = SessionStorage.receive(currentSession);
                    }


                    if (result != null) {

                %>
                <tr>
                    <td width="25%"><%= result.getX() %></td>
                    <td width="25%"><%= result.getY() %></td>
                    <td width="25%"><%= result.getR() %></td>
                    <td width="25%"><%= result.getValue() %></td>
                </tr>
                <% } else { %>
                <tr>
                    <td colspan="4" style="text-align: center;">Нет данных для отображения</td>
                </tr>
                <% } %>
        </table>
    </div>
</div>

<div class="button-container">
    <button type="goback" class="data-button" value="1" onclick="window.location.href='/labDVA/';">
        Гет бэк
    </button>
</div>

<script src="script.js"></script>
<script src="link.js"></script>
</body>
</html>