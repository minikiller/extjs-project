/**
 * 机构模块控制器
 *
 * @author majian <br/>
 *         date:2015-7-21
 * @version 1.0.0
 */
Ext.define('Kalix.admin.org.controller.OrgController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.orgController',
    requires: [
        "Kalix.admin.area.view.AreaList",
        "Kalix.admin.org.view.OrgList",
        'Kalix.admin.org.view.OrgGrid'
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
            items: [this.onInitAreaList(), this.onInitDataGrid()]
        })

        return panel;
    },
    /**
     * 区域单击
     */
    onAreaClick: function (view, record, item, index, e) {

        var grid = Ext.ComponentQuery.query('orgGridPanel')[0];
        grid.areaId = record.data.id;
        grid.areaName = record.data.name;
        var store = grid.getStore();
        store.setProxy({
            type: "ajax",
            url: '/kalix/camel/rest/orgs/area/' + record.data.id
        });
        store.reload();
    },
    /**
     * 区域刷新
     */
    onAreaRefersh: function () {
        Ext.ComponentQuery.query('orgPanel')[0].down("#mainPanel>#orgAreaList").getStore().reload();
    },
    /**
     * 区域展开
     * @constructor
     */
    onAreaAxpandAll: function () {
        Ext.ComponentQuery.query('orgPanel')[0].down("#mainPanel>#orgAreaList").expandAll(function () {
        });
    },
    /**
     * 区域收起
     * @constructor
     */
    onAreaCollapseAll: function () {
        Ext.ComponentQuery.query('orgPanel')[0].down("#mainPanel>#orgAreaList").collapseAll(function () {
        });
    },
    /**
     * 初始化区域列表.
     * @returns {Ext.panel.Panel}
     */
    onInitAreaList: function () {
        var orgListPanel = Ext.create("Kalix.admin.area.view.AreaList", {
            store: Ext.create("Kalix.admin.area.store.AreaStore"),
            region: "west",
            itemId: "orgAreaList",
            title: '区域列表',
            listeners: {
                itemClick: this.onAreaClick
            },
            tbar: [
                {
                    text: '刷新', icon: 'admin/resources/images/shape_square_go.png',
                    handler: this.onAreaRefersh
                },
                {
                    text: '展开', icon: 'admin/resources/images/arrow_down.png',
                    handler: this.onAreaAxpandAll
                },
                {
                    text: '收起', icon: 'admin/resources/images/arrow_up.png',
                    handler: this.onAreaCollapseAll
                }]
        });
        return orgListPanel;
    },
    /**
     * 初始化数据表格.
     * @returns {Ext.panel.Panel}
     */
    onInitDataGrid: function () {
        var dataGird = Ext.create("Kalix.admin.org.view.OrgGrid",{
            store:Ext.create("Kalix.admin.org.store.OrgStore")
        });
        return dataGird;
    }
});