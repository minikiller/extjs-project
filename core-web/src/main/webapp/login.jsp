<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="org.apache.shiro.SecurityUtils,org.apache.shiro.subject.Subject" %>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>Kalix</title>
    <script src="/core-web/ext-5.1.0/ext-all.js"></script>
    <script src="/core-web/ext-5.1.0/packages/ext-locale/ext-locale-zh_CN.js"></script>
    <link href="/core-web/ext-5.1.0/packages/ext-theme-classic/build/resources/ext-theme-classic-all.css"
          rel="stylesheet"/>

    <script type="text/javascript" src="app/loginApp.js"></script>
    <script type="text/javascript" src="resources/js/Config.js"></script>
    <script type="text/javascript" src="resources/js/DateFormat.js"></script>
    <!-- 引入Font Awesome的css文件 -->
    <link type="text/css" rel="stylesheet" href="resources/css/font-awesome.min.css">
</head>
<body>
<%
    Subject subject=SecurityUtils.getSubject();
    if(subject!=null)
        subject.logout();
%>
</body>
</html>