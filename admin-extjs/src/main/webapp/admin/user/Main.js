/**
 * 用户组件
 *
 * @author majian <br/>
 *         date:2015-6-18
 * @version 1.0.0
 */
Ext.define('kalix.admin.user.Main', {
    extend: 'Ext.container.Container',
    requires: [
        'kalix.admin.user.store.UserStore',  //用户模型集合
        'kalix.admin.user.view.UserGrid',
        'kalix.admin.user.view.UserSearchForm'
    ],
    items: [
        {
            xtype:'userSearchForm'
        },{
            xtype: 'userGridPanel',
            id: 'userGridPanel',
            title: '用户列表',
            margin: 10,
            store: {
                type: 'userStore'
            }
        }
    ]
});
