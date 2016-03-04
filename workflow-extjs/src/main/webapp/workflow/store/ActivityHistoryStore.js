/**
 * 用户数据仓库
 *
 * @author majian <br/>
 *         date:2015-7-3
 * @version 1.0.0
 */
Ext.define('kalix.workflow.store.ActivityHistoryStore', {
    extend: 'kalix.store.BaseStore',
    model: 'kalix.workflow.model.ActivityHistoryModel',
    alias: 'store.activityHistoryStore',
    xtype: 'activityHistoryStore',
    storeId: 'activityHistoryStore',
    autoLoad: false,
    pageSize: 10,
    proxy: {
        type: "ajax",
        url: CONFIG.restRoot + '/camel/rest/workflow/activities',
        reader: {
            type: "json",
            rootProperty: "data",
            totalProperty: 'totalCount'
        }
    }
});