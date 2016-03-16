/**
 * 常量定义
 *
 * @author majian <br/>
 *         date:2015-7-3
 * @version 1.0.0
 */
var CONFIG = {
    ALTER_TITLE_SUCCESS: "成功信息",
    ALTER_TITLE_FAILURE: "失败信息",
    ALTER_TITLE_ERROR: "错误信息",
    ALTER_TITLE_INFO: "提示信息",
    restRoot: '',
    theme: 'theme-triton'
};

var DynamicLoading = {
    css: function (path) {
        if (!path || path.length === 0) {
            throw new Error('argument "path" is required !');
        }

        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.href = path;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        head.appendChild(link);
    },
    js: function (path) {
        if (!path || path.length === 0) {
            throw new Error('argument "path" is required !');
        }

        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');

        script.src = path;
        script.type = 'text/javascript';
        head.appendChild(script);
    }
};

