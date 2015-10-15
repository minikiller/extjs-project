/**
 * 工作组模块控制器
 *
 * @author majian <br/>
 *         date:2015-7-10
 * @version 1.0.0
 */
Ext.define('kalix.AdminApplication.WorkGroup.controller.WorkGroupController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.workGroupController',
    requires: [
        'kalix.view.components.common.PagingToolBar',
        'kalix.AdminApplication.WorkGroup.view.WorkGroupGrid'
    ],
    /**
     * 初始化面板.
     * @returns {Ext.panel.Panel}
     */
    onInitPanel: function () {
      
        var panel = Ext.create("Ext.panel.Panel", {
          border: false,
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
                columnWidth: .3,
                border: false,
                layout: 'form',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: '名称',
                    itemId: "admin_workGroup_nameId",
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
            items: [formPanelRow1]
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
        var dataStore = Ext.create("kalix.AdminApplication.WorkGroup.store.WorkGroupStore");
        var dataGird = Ext.create("kalix.AdminApplication.WorkGroup.view.WorkGroupGrid", {
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