/**
 * 主应用程序
 *
 * date:2015-10-26
 */

Ext.define('kalix.core.Application', {
    extend: 'Ext.app.Application',

    name: 'kalix',

    stores: [
        'kalix.core.store.NavigationTree',
        'kalix.core.store.MainToolbar'
    ],

    models: [],

    defaultToken: 'admin',

    launch: function () {
        //格式化时间类型代码，防止出现T字符
        Ext.JSON.encodeDate = function (d) {
            return Ext.Date.format(d, '"Y-m-d h:i:s"');
        };
        // TODO - Launch the application
    }
});
