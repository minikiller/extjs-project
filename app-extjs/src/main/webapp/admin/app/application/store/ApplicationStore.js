/**
 * 应用数据仓库
 *
 * @author majian <br/>
 *         date:2015-7-3
 * @version 1.0.0
 */
Ext.define('kalix.admin.app.application.store.ApplicationStore', {
    extend: 'Ext.data.Store',
    model: 'kalix.admin.app.application.model.ApplicationModel',
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