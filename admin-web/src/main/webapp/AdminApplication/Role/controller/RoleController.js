/**
 * 角色模块控制器
 *
 * @author majian <br/>
 *         date:2015-7-10
 * @version 1.0.0
 */
Ext.define('kalix.AdminApplication.Role.controller.RoleController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.roleController',
    requires: [
        'kalix.view.components.common.PagingToolBar',
        'kalix.AdminApplication.Role.view.RoleGrid'
    ],
    /**
     * 初始化面板.
     * @returns {Ext.panel.Panel}
     */
    onInitPanel: function () {

        var panel = Ext.create("Ext.panel.Panel", {
            border: false,
            autoScroll: true,
            //height: document.body.clientHeight - 110, //客户端屏幕高度-底部-工具条以及选项卡
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
                    fieldLabel: '名称',
                    id: "admin_role_nameId",
                    name: 'name'
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
        var dataStore = Ext.create("kalix.AdminApplication.Role.store.RoleStore");
        var dataGird = Ext.create("kalix.AdminApplication.Role.view.RoleGrid", {
            store: dataStore,
            height: document.body.clientHeight - 224,
            bbar: [{
                xtype: 'pagingToolBarComponent',
                store: dataStore
            }]
        });
        return dataGird;
    }
});