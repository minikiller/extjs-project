/**
 * 用户模块控制器
 *
 * @author majian <br/>
 *         date:2015-6-18
 * @version 1.0.0
 */
Ext.define('kalix.AdminApplication.User.controller.UserController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.userController',
    requires: [
        'kalix.view.components.common.PagingToolBar',
        'kalix.AdminApplication.User.view.UserGrid',
        'kalix.view.components.common.SecurityToolbar'
    ],
    /**
     * 初始化面板.
     * @returns {Ext.panel.Panel}
     */
    onInitPanel: function () {
        var panel = Ext.create("Ext.panel.Panel", {
            border: false,
            autoScroll: true,
            height: document.body.clientHeight - 110, //客户端屏幕高度-底部-工具条以及选项卡
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
                    itemId: 'loginName',
                    fieldLabel: '登录名'
                }]
            }, {
                columnWidth: .2,
                border: false,
                layout: 'form',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: '姓名',
                    itemId: 'name'
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
                        itemId: 'available',
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
                            var queryPanel = this.up().up();
                            var loginNameValue = queryPanel.down("#loginName").getValue();
                            var nameValue = queryPanel.down("#name").getValue();
                            var availableValue = queryPanel.down("#available").getValue();
                            var grid = Ext.ComponentQuery.query('userGridPanel')[0];
                            var store = grid.getStore();
                            store.on('beforeload', function (store, options) {
                                var params = {loginName: loginNameValue, name: nameValue, available: availableValue};
                                Ext.apply(store.proxy.extraParams, params);
                            });
                            store.load({params: {start: 0, limit: 10, page: 1}});
                            //var grid = Ext.ComponentQuery.query('userGridPanel')[0];
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
        var securityToolbar = Ext.create("kalix.view.components.common.SecurityToolbar");
        securityToolbar.verifyButton([
            {
                text: '新增',
                xtype: 'button',
                permission: 'admin:sysModule:permissionControl:userMenu:add',
                icon: 'admin/resources/images/group_add.png',
                handler: 'onAdd'
            }, {
                text: '修改',
                xtype: 'button',
                permission: 'admin:sysModule:permissionControl:userMenu:update',
                icon: "admin/resources/images/group_edit.png",
                handler: 'onEdit'
            }, {
                text: '删除',
                xtype: 'button',
                permission: 'admin:sysModule:permissionControl:userMenu:delete',
                icon: "admin/resources/images/group_delete.png",
                handler: 'onDelete'

            }
        ]);
        //securityToolbar.add({
        //    text: '新增',xtype:'button',permission:'admin:sysModule:permissionControl:userMenu:add', icon: 'resources/images/group_add.png', handler: 'onAdd'
        //});
        var dataStore = Ext.create("kalix.AdminApplication.User.store.UserStore");
        var dataGird = Ext.create("kalix.AdminApplication.User.view.UserGrid", {
            store: dataStore,
            height: document.body.clientHeight - 210,
            tbar: securityToolbar,
            bbar: [{
                xtype: 'pagingToolBarComponent',
                store: dataStore
            }]
        });
        //var columns=dataGird.getColumns();
        //alert(columns.length);
        //dataGird.add(actionColumn);
        return dataGird;
    }
});