/**
 * 应用模块控制器
 *
 * @author majian <br/>
 *         date:2015-6-18
 * @version 1.0.0
 */
Ext.define('kalix.admin.app.application.controller.ApplicationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.applicationController',
    requires: [
        'kalix.view.components.common.PagingToolBar',
        'kalix.admin.app.application.view.ApplicationGrid'
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
                    fieldLabel: '登录名',
                    itemId: "app_application_applicationnameSearchId",
                    name: 'applicationname'
                }]
            }, {
                columnWidth: .2,
                border: false,
                layout: 'form',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: '姓名',
                    itemId: "app_application_nameSearchId",
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
                        id: "app_application_statusSearchId",
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
        var dataStore = Ext.create("kalix.admin.app.application.store.ApplicationStore");
        var dataGird = Ext.create("kalix.admin.app.application.view.ApplicationGrid", {
            store: dataStore,
            //height: document.body.clientHeight - 210,
            bbar: [{
                xtype: 'pagingToolBarComponent',
                store: dataStore
            }]
        });
        return dataGird;
    }
});