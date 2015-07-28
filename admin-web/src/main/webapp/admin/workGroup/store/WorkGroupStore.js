/**
 * 工作组数据仓库
 *
 * @author majian <br/>
 *         date:2015-7-24
 * @version 1.0.0
 */
Ext.define('Kalix.admin.workGroup.store.WorkGroupStore', {
    extend: 'Ext.data.Store',
    model: 'Kalix.admin.workGroup.model.WorkGroupModel',
    alias: 'store.workGroupStore',
    xtype: 'workGroupStore',
    storeId: "workGroupStore",
    autoLoad: true,
    pageSize: 10,
    proxy: {
        type: "ajax",
        url: '/kalix/camel/rest/workGroups',
        reader: {
            type: "json",
            rootProperty: "data",
            totalProperty: 'totalCount'
        }
    }
});