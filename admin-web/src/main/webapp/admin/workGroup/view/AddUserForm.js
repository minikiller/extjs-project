/**
 * 添加用户组件
 *
 * @author majian <br/>
 *         date:2015-7-28
 * @version 1.0.0
 */
Ext.define('Kalix.admin.workGroup.view.AddUserForm', {
    extend: 'Ext.container.Container',
    requires: [
        'Ext.view.MultiSelector',
        'Kalix.admin.user.model.UserModel'
    ],
    xtype: 'multi-selector',
    width: 400,
    height: 300,
    layout: 'fit',
    items: [{
        xtype: 'multiselector',
        title: '已选用户',
        fieldName: 'name',
        viewConfig: {
            deferEmptyText: false,
            emptyText: '没有选择用户'
        },
        search: {
            field: 'name',
            store: {
                model: 'Kalix.admin.user.model.UserModel',
                sorters: 'name',
                autoLoad: true,
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
            }
        }
    }]
});