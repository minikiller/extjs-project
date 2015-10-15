/**
 * 角色数据仓库
 *
 * @author majian <br/>
 *         date:2015-7-10
 * @version 1.0.0
 */
Ext.define('kalix.AdminApplication.Role.store.RoleStore', {
    extend: 'Ext.data.Store',
    model: 'kalix.AdminApplication.Role.model.RoleModel',
    alias: 'store.roleStore',
    xtype: 'roleStore',
    storeId: "roleStore",
    autoLoad: true,
    pageSize: 10,
    proxy: {
        type: "ajax",
        url: '/kalix/camel/rest/roles',
        reader: {
            type: "json",
            rootProperty: "data",
            totalProperty: 'totalCount'
        }
    }
});