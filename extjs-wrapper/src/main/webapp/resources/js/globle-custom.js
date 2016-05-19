/**
 * 全局定义
 *
 * @author chenyanxu
 */
var CONFIG = {
    ALTER_TITLE_SUCCESS: "成功信息",
    ALTER_TITLE_FAILURE: "失败信息",
    ALTER_TITLE_ERROR: "错误信息",
    ALTER_TITLE_INFO: "提示信息",
    restRoot: '',
    theme: 'theme-triton'
};

Ext.JSON.toArray = function (obj) {
    var rtn = [];

    for (var key in obj) {
        rtn[rtn.length] = {key: key, value: obj[key]};
    }

    return rtn;
};

//Date.prototype.format = function (format) {
//    var o = {
//        "M+": this.getMonth() + 1,
//        "d+": this.getDate(),
//        "h+": this.getHours(),
//        "m+": this.getMinutes(),
//        "s+": this.getSeconds(),
//        "q+": Math.floor((this.getMonth() + 3) / 3),
//        "S": this.getMilliseconds()
//    }
//    if (/(y+)/.test(format)) {
//        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
//    }
//    for (var k in o) {
//        if (new RegExp("(" + k + ")").test(format)) {
//            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
//        }
//    }
//    return format;
//}

