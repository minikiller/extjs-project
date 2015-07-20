/**
 * 用户数据仓库
 *
 * @author majian <br/>
 *         date:2015-7-3
 * @version 1.0.0
 */
Ext.define('Kalix.admin.user.store.UserStore', {
    extend: 'Ext.data.Store',
    model: 'Kalix.admin.user.model.UserModel',
    alias: 'store.userStore',
    xtype: 'userStore',
    storeId: "userStore",
    autoLoad: true,
    pageSize: 10,
    proxy: {
        type: "ajax",
        url: '/camel/rest/users',
        reader: {
            type: "json",
            root: "data",
            totalProperty: 'totalCount'
        }
    }
});