/**
 * 流程历史数据仓库
 *
 * @author majian <br/>
 *         date:2015-7-3
 * @version 1.0.0
 */
Ext.define('kalix.workflow.myprocesshistory.store.MyProcessHistoryStore', {
    extend: 'kalix.store.BaseStore',
    model: 'kalix.workflow.myprocesshistory.model.ProcessHistoryModel',
    alias: 'store.myProcessHistoryStore',
    xtype: 'myProcessHistoryStore',
    storeId: "myProcessHistoryStore",
    proxyUrl: CONFIG.restRoot + '/camel/rest/workflow/myHistory'
});