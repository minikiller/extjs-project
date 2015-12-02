/**
 * @author chenyanxu
 */

Ext.JSON.toArray = function (obj) {
    var rtn = [];

    for (var key in obj) {
        rtn[rtn.length] = {key: key, value: obj[key]};
    }

    return rtn;
}
