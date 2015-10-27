/**
 * 用户多选组件数据仓库
 *
 * @author majian <br/>
 *         date:2015-7-3
 * @version 1.0.0
 */
Ext.define('Kalix.admin.user.store.UserItemSelectorStore', {
    extend: 'Ext.data.Store',
    model: 'Kalix.admin.user.model.UserModel',
    alias: 'store.userItemSelectorStore',
    xtype: 'userItemSelectorStore',
    autoLoad: true,
    fields: ['id', 'name'],
    proxy: {
        type: 'ajax',
        limitParam: null,
        url: '/kalix/camel/rest/users/all',
        reader: {
            type: "json",
            root: "data",
            totalProperty: 'totalCount'
        }
    }
});