/**
 * 用户数据仓库
 *
 * @author majian <br/>
 *         date:2015-7-3
 * @version 1.0.0
 */
Ext.define('kalix.admin.user.store.UserStore', {
    extend: 'kalix.store.BaseStore',
    model: 'kalix.admin.user.model.UserModel',
    alias: 'store.userStore',
    xtype: 'userStore',
    storeId: "userStore",
    autoLoad: true,
    pageSize: 10,
    proxy: {
        type: "ajax",
        url: CONFIG.restRoot + '/camel/rest/users/list',
        paramsAsJson: true,
        actionMethods: {
            create: 'POST',
            read: 'POST',
            update: 'POST',
            destroy: 'POST'
        },
        reader: {
            type: "json",
            totalProperty: 'totalCount'
        }
    }
});