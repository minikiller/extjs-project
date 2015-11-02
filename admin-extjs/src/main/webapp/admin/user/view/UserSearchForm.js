/**
 * Created by lenovo on 2015/11/2.
 */

Ext.define('kalix.admin.user.view.UserSearchForm', {
    extend: 'Ext.form.Panel',
    requires: [
        'kalix.admin.user.controller.UserController'
    ],
    alias: 'widget.userSearchForm',
    xtype: 'userSearchForm',
    controller: 'userController',
    title: '用户查询',
    bodyPadding: 10,
    layout: 'column',
    margin: 10,
    method: "POST",
    url: 'login',
    autoShow:true,
    items: [
        {
                xtype: 'textfield',
                fieldLabel: '登录名',
                labelAlign: 'right',
                labelWidth: 60,
                width: 200,
                name: 'loginName'
            }, {
                xtype: 'textfield',
                fieldLabel: '姓名',
                labelAlign: 'right',
                labelWidth: 40,
                width: 200,
                name: 'name'
            }, {
                xtype: 'combobox',
                fieldLabel: '状态',
                labelAlign: 'right',
                labelWidth: 40,
                editable: false,
                name: 'available',
                value: '-1',
                store: [
                    ['-1', '全部'],
                    ['1', '启用'],
                    ['0', '停用']
                ]
            }, {
                xtype: 'button',
                text: '查询',
                margin: '0 0 0 10',
                handler: 'onSearch',
                glyph: 'xf002@FontAwesome',
            }
            ]
});
