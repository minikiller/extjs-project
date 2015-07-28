/**
 * 用户数据仓库
 *
 * @author majian <br/>
 *         date:2015-7-3
 * @version 1.0.0
 */
Ext.define('Kalix.notice.store.NoticeStore', {
    extend: 'Ext.data.Store',
    model: 'Kalix.notice.model.NoticeModel',
    alias: 'store.noticeStore',
    xtype: 'noticeStore',
    storeId: "noticeStore",
    autoLoad: true,
    pageSize: 10,
    proxy: {
        type: "ajax",
        url: '/kalix/camel/rest/notices',
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