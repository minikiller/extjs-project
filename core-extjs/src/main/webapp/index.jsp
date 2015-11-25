<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="org.apache.shiro.SecurityUtils,org.apache.shiro.session.Session" %>
<%@ page import="org.apache.shiro.subject.Subject" %>
<!DOCTYPE HTML>
<html manifest="">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

    <title>kalix</title>
    <link href="resources/ext/kalix-all.css" rel="stylesheet"/>
    <script type="text/javascript" src="resources/js/ext-all-debug.js"></script>
    <script type="text/javascript" src="resources/js/underscore-min.js"></script>
    <script type="text/javascript" src="resources/js/locale-zh_CN.js"></script>
    <script type="text/javascript" src="resources/js/app.js"></script>
    <script type="text/javascript" src="resources/js/Picker.js"></script>
    <script type="text/javascript" src="resources/js/Exporter.js"></script>
    <script type="text/javascript" src="resources/js/Config.js"></script>
    <script type="text/javascript" src="resources/js/DateFormat.js"></script>
    <!-- 引入Font Awesome的css文件 -->
    <link type="text/css" rel="stylesheet" href="resources/css/KitchenSink-all_2.css"/>
    <link type="text/css" rel="stylesheet" href="resources/css/index.css"/>
    <link type="text/css" rel="stylesheet" href="resources/css/notify.css"/>


</head>
<body>
<%
    Subject subject = SecurityUtils.getSubject();
    Session shiro = subject.getSession();
    String userName = (String) shiro.getAttribute("currentUsername");
//    shiro把属性设置到httpSession中，因此下面代码也可以取得属性。
//    session.getAttribute("currentUsername");
    if (userName == null) {
        response.sendRedirect("login.jsp");
    } else {
        System.out.println("user has already login as " + userName);
    }

%>
</body>
</html>