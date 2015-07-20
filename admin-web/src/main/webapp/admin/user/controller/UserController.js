/**
 * 用户模块控制器
 *
 * @author majian <br/>
 *         date:2015-6-18
 * @version 1.0.0
 */
Ext.define('Kalix.admin.user.controller.UserController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.userController',
    requires: [
        'Kalix.view.components.common.PagingToolBar',
        'Kalix.admin.user.view.UserGrid'
    ],
    /**
     * 初始化面板.
     * @returns {Ext.panel.Panel}
     */
    onInitPanel: function () {

        var panel = Ext.create("Ext.panel.Panel", {
            border: false,
            autoScroll: true,
            height: 640,
            items: [this.onInitSearchPanel(), this.onInitDataGrid()]
        })

        return panel;
    },
    /**
     * 初始化查询面板.
     * @returns {Ext.panel.Panel}
     */
    onInitSearchPanel: function () {
        var formPanelRow1 = {
            border: false,
            layout: 'column',
            items: [{
                columnWidth: .2,
                border: false,
                layout: 'form',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: '登录名',
                    id: "admin_user_usernameSearchId",
                    name: 'username'
                }]
            }, {
                columnWidth: .2,
                border: false,
                layout: 'form',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: '姓名',
                    id: "admin_user_nameSearchId",
                    name: 'name'
                }]
            },
                {
                    columnWidth: .2,
                    border: false,
                    layout: 'form',
                    items: [{
                        xtype: 'combobox',
                        fieldLabel: '状态',
                        editable: false,
                        id: "admin_user_statusSearchId",
                        name: 'status',
                        value: '-1',
                        store: [
                            ['-1', '全部'],
                            ['1', '启用'],
                            ['0', '停用']
                        ]
                    }]
                },
                {
                    columnWidth: .2,
                    border: false,
                    layout: 'form',
                    items: [{
                        xtype: 'button',
                        text: '查询',
                        handler: function () {
                        }
                    }]
                }]
        };


        //form
        var formPanel = Ext.create('Ext.form.FormPanel', {
            border: false,
            layout: 'form',
            labelWidth: 65,
            labelAlign: 'right',
            items: [formPanelRow1],
            buttonAlign: 'center'
        });


        var searchPanel = Ext.create("Ext.panel.Panel", {
            title: '条件查询',
            border: false,
            items: [formPanel]
        });

        return searchPanel;
    },
    /**
     * 初始化数据表格.
     * @returns {Ext.panel.Panel}
     */
    onInitDataGrid: function () {
        var dataGird = Ext.create("Kalix.admin.user.view.UserGrid");
        return dataGird;
    }
});