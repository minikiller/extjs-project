<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%String path = request.getContextPath();%>
<!DOCTYPE HTML>
<html manifest="">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

    <title>数字动画生产工艺流程可视化管理系统V2.0</title>
    <link rel="icon" href="resources/images/favicon.ico" type="image/x-icon"/>
    <script type="text/javascript" src="<%=path %>/resources/js/dynamic-loader.js"></script>
    <script type="text/javascript" src="<%=path %>/resources/ext/ext-all-debug.js"></script>
    <script type="text/javascript" src="<%=path %>/resources/js/globle-custom.js"></script>
    <script type="text/javascript">CONFIG.restRoot = '<%=path %>';</script>
    <script type="text/javascript" src="<%=path %>/resources/ext/locale/locale-zh_CN.js"></script>
    <script type="text/javascript" src="<%=path %>/resources/js/underscore-min.js"></script>
    <link type="text/css" rel="stylesheet" href="<%=path %>/resources/css/notify.css"/>
    <script type="text/javascript">
        Ext.Loader.setConfig({ enabled: true, disableCaching: false });
        Ext.onReady(function () {
            Ext.Ajax.request({
                async:false,
                url: 'camel/rest/system/preferences',
                success: function (response, opts) {
                    var obj = Ext.decode(response.responseText);

                    if (obj != null && obj.theme) {
                        DynamicLoading.css(CONFIG.restRoot + '/resources/ext/classic/' + obj.theme + '/' + obj.theme + '-all.css');
                        CONFIG.theme = obj.theme;
                    }
                    else {
                        DynamicLoading.css(CONFIG.restRoot + '/resources/ext/classic/theme-triton/theme-triton-all.css');
                    }
                },
                failure: function (response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                    DynamicLoading.css(CONFIG.restRoot + '/resources/ext/classic/theme-triton/theme-triton-all.css');
                },
                callback: function () {
                    DynamicLoading.js(CONFIG.restRoot + '/resources/js/app.js');
                }
            });

            DynamicLoading.css(CONFIG.restRoot + '/resources/css/custom.css');
        });
    </script>
</head>
<body>
</body>
</html>