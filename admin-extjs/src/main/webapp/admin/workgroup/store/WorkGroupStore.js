/**
 * 工作组数据仓库
 *
 * @author majian <br/>
 *         date:2015-7-24
 * @version 1.0.0
 */
Ext.define('kalix.admin.workgroup.store.WorkGroupStore', {
    extend: 'Ext.data.Store',
    model: 'kalix.admin.workgroup.model.WorkGroupModel',
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