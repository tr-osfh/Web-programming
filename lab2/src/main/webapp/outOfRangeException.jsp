<%@page contentType="text/html; charset=UTF-8" %>
<%@page isErrorPage="true" %>
<html>
<style>
    <%@include file="style.css" %>
</style>
<head><title>ЛАБА ДВА</title>
    <meta charset="UTF-8">
</head>
<body>
    <div class="error-container">
        <h1>ОШИБКА!</h1>
        <h4> <%= exception.getMessage()%> </h4>

        <div class="button-container">
            <button type="goback" class="data-button" value="1" onclick="window.location.href='/labDVA/';">
                Гет бэк
            </button>
        </div>
    </div>


</body>
</html>


