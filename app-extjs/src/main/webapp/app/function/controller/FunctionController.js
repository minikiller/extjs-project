/**
 * 功能模块控制器
 *
 * @author majian <br/>
 *         date:2015-7-31
 * @version 1.0.0
 */
Ext.define('Kalix.app.function.controller.FunctionController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.functionController',
    requires: [
        "Kalix.app.application.view.ApplicationTreeList",
        'Kalix.app.function.view.FunctionGrid'
    ],
    /**
     * 初始化面板.
     * @returns {Ext.panel.Panel}
     */
    onInitPanel: function () {
        var panel = Ext.create("Ext.panel.Panel", {
            border: false,
            layout: "border",
            autoScroll: true,
            itemId: "mainPanel",
            height: 630,
            items: [this.onInitApplicationList(), this.onInitDataGrid()]
        })

        return panel;
    },
    /**
     * 应用单击
     */
    onApplicationClick: function (view, record, item, index, e) {

        var grid = Ext.ComponentQuery.query('functionGridPanel')[0];
        grid.applicationId = record.data.id;
        grid.applicationCode = record.data.code;
        grid.applicationName = record.data.name;
        var store = grid.getStore();
        store.setProxy({
            type: "ajax",
            url: '/kalix/camel/rest/functions/application/' + record.data.id
        });
        store.reload();
    },
    /**
     * 应用刷新
     */
    onApplicationRefersh: function () {
        Ext.ComponentQuery.query('functionPanel')[0].down("#mainPanel>#applicationList").getStore().reload();
    },
    /**
     * 应用展开
     * @constructor
     */
    onApplicationAxpandAll: function () {
        Ext.ComponentQuery.query('functionPanel')[0].down("#mainPanel>#applicationList").expandAll(function () {
        });
    },
    /**
     * 应用收起
     * @constructor
     */
    onApplicationCollapseAll: function () {
        Ext.ComponentQuery.query('functionPanel')[0].down("#mainPanel>#applicationList").collapseAll(function () {
        });
    },
    /**
     * 初始化应用列表.
     * @returns {Ext.panel.Panel}
     */
    onInitApplicationList: function () {
        var applicationListPanel = Ext.create("Kalix.app.application.view.ApplicationTreeList", {
            store: Ext.create("Kalix.app.application.store.ApplicationTreeListStore"),
            region: "west",
            itemId: "applicationList",
            title: '应用列表',
            listeners: {
                itemClick: this.onApplicationClick
            },
            tbar: [
                {
                    text: '刷新', icon: 'app/resources/images/arrow_refresh.png',
                    handler: this.onApplicationRefersh
                }]
        });
        return applicationListPanel;
    },
    /**
     * 初始化数据表格.
     * @returns {Ext.panel.Panel}
     */
    onInitDataGrid: function () {
        var dataGird = Ext.create("Kalix.app.function.view.FunctionGrid", {
            store: Ext.create("Kalix.app.function.store.FunctionStore")
        });
        return dataGird;
    }
});