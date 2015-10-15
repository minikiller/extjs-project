<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="org.apache.shiro.SecurityUtils,org.apache.shiro.subject.Subject" %>
<!DOCTYPE HTML>
<html manifest="">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

    <title>kalix</title>
    <link href="resources/ext/kalix-all.css" rel="stylesheet"/>

    <script type="text/javascript" src="resources/js/ext-all.js"></script> 
    <script type="text/javascript" src="resources/js/locale-zh_CN.js"></script>     
    <script type="text/javascript" src="resources/js/login.js"></script> 
    <script type="text/javascript" src="resources/js/Config.js"></script>
    <script type="text/javascript" src="resources/js/DateFormat.js"></script>
    
</head>
<body>
<%
    Subject subject=SecurityUtils.getSubject();
    if(subject!=null)
        subject.logout();
%>
</body>
</html>