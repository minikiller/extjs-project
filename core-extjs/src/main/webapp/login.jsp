<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%String path = request.getContextPath();%>
<!DOCTYPE HTML>
<html manifest="">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <style type="text/css">html{height:100%}</style>
    <title>数字动画生产工艺流程可视化管理系统V2.0</title>
    <link rel="icon" href="resources/images/favicon.ico" type="image/x-icon"/>
    <script type="text/javascript" src="<%=path %>/resources/js/dynamic-loader.js"></script>
    <script type="text/javascript">var rootPath = '<%=path %>';</script>
    <%--<link href="<%=path %>/resources/ext/classic/theme-triton/theme-triton-all.css" rel="stylesheet"/>--%>
    <%--<script type="text/javascript" src="<%=path %>/resources/ext/ext-all.js"></script>--%>
    <%--<script type="text/javascript" src="<%=path %>/resources/js/globle-custom.js"></script>--%>
    <%--<script type="text/javascript">CONFIG.restRoot= '<%=path %>';</script>--%>
    <%--<script type="text/javascript" src="<%=path %>/resources/ext/locale/locale-zh_CN.js"></script>--%>
    <%--<script type="text/javascript" src="<%=path %>/resources/js/login.js"></script>--%>
</head>
<body style='background: url(resources/images/loading.gif) 50% 50% no-repeat;'>
</body>
<script type="text/javascript">
    var Ext;
    DynamicLoading.css(rootPath+'/resources/ext/classic/theme-triton/theme-triton-all.css');
    DynamicLoading.js(rootPath+'/resources/ext/ext-all.js');
    var CONFIG ={restRoot:rootPath};
    var intervalObj = setInterval(function(){
        if(Ext){
            clearInterval(intervalObj);
            DynamicLoading.js(rootPath+'/resources/js/login.js');
    }},50);
</script>
</html>