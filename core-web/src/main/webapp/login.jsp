<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="org.apache.shiro.SecurityUtils" %>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>Kalix</title>
    <script src="/core-web/ext-5.1.0/ext-all.js"></script>
    <script src="/core-web/ext-5.1.0/packages/ext-locale/ext-locale-zh_CN.js"></script>
    <link href="/core-web/ext-5.1.0/packages/ext-theme-classic/build/resources/ext-theme-classic-all.css"
          rel="stylesheet"/>

    <script type="text/javascript" src="/kalix/app/loginApp.js"></script>
    <script type="text/javascript" src="/kalix/js/Config.js"></script>
    <script type="text/javascript" src="/kalix/js/DateFormat.js"></script>
</head>
<body>
<%
    SecurityUtils.getSubject().logout();
%>
</body>
</html>