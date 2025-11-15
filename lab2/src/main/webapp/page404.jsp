<%@page contentType="text/html; charset=UTF-8" %>
<%@page isErrorPage="true" %>
<html>
<style>
    <%@include file="style.css" %>
</style>
<head><title>404</title>
    <meta charset="UTF-8">
</head>
<body>
    <div class="error-container">
        <h1><a href="https://ru.wikipedia.org/wiki/%D0%9E%D1%88%D0%B8%D0%B1%D0%BA%D0%B0_404"> Ошибка 404 </a></h1>
        <h4> Этой страницы не существует </h4>

        <div class="button-container">
            <button type="goback" class="data-button" value="1" onclick="window.location.href='/labDVA/';">
                На главную
            </button>
        </div>
    </div>


</body>
</html>


