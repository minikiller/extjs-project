/**
 * 主应用程序
 *
 * date:2015-10-26
 */

Ext.define('kalix.core.Application', {
    extend: 'Ext.app.Application',
    stores: [
        'kalix.core.store.NavigationTree',
        'kalix.core.store.MainToolbar'
    ],

    models: [],

    defaultToken: '',

    launch: function () {
        //格式化时间类型代码，防止出现T字符
        Ext.JSON.encodeDate = function (d) {
            return Ext.Date.format(d, '"Y-m-d H:i:s"');
        };
        //Ext.ux.ActivityMonitor.init({ verbose : true });
        // Ext.ux.ActivityMonitor.start();
        // TODO - Launch the application
    }
});
