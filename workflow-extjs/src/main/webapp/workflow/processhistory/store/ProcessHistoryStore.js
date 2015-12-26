/**
 * 用户数据仓库
 *
 * @author majian <br/>
 *         date:2015-7-3
 * @version 1.0.0
 */
Ext.define('kalix.workflow.processhistory.store.ProcessHistoryStore', {
    extend: 'kalix.store.BaseStore',
    model: 'kalix.workflow.processhistory.model.ProcessHistoryModel',
    alias: 'store.processHistoryStore',
    xtype: 'processHistoryStore',
    storeId: "processHistoryStore",
    autoLoad: true,
    pageSize: 10,
    proxy: {
        type: "ajax",
        url: CONFIG.restRoot + '/camel/rest/workflow/historys',
        reader: {
            type: "json",
            rootProperty: "data",
            totalProperty: 'totalCount'
        }
    },
    onCreateRecords: function (records, operation, success) {
        console.log(records);
    },

    onUpdateRecords: function (records, operation, success) {
        // If update failed, reject all changes
        if (!success) {
            // Call rejectChanges method of the store
            this.rejectChanges();

            Ext.Msg.show({
                title: 'Update Failed',
                message: 'The changes you have made are rejected.',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
        }
    },

    onDestroyRecords: function (records, operation, success) {
        console.log(records);
    }
});