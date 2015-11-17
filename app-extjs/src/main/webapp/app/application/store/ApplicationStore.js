/**
 * 应用数据仓库
 *
 * @author majian <br/>
 *         date:2015-7-3
 * @version 1.0.0
 */
Ext.define('kalix.app.application.store.ApplicationStore', {
    extend: 'kalix.store.BaseStore',
    model: 'kalix.app.application.model.ApplicationModel',
    alias: 'store.applicationStore',
    xtype: 'applicationStore',
    storeId: "applicationStore",
    autoLoad: true,
    pageSize: 10,
    proxy: {
        type: "ajax",
        url: '/kalix/camel/rest/applications',
        reader: {
            type: "json",
            rootProperty: "data",
            totalProperty: 'totalCount'
        }
    }
});