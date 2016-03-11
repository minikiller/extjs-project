/**
 * 部门模块控制器
 *
 * @author zangyanming <br/>
 *         date:2016-3-10
 * @version 1.0.0
 */
Ext.define('kalix.admin.depNoArea.controller.DepNoAreaController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.depNoAreaController',
    requires: [
        'kalix.admin.orgNoArea.view.OrgNoAreaTreeList',
        'kalix.admin.depNoArea.view.DepNoAreaGrid'
    ],
    /**
     * 初始化面板.
     * @returns {Ext.panel.Panel}
     */
    onInitPanel: function () {
        var panel = Ext.create('Ext.panel.Panel', {
            layout: 'hbox',
            itemId: 'mainPanel',
            autoScroll: true,
            items: [
                {xtype: 'container', padding:'10 10 10 0', flex: 1, items: [this.onInitOrgTreeList()]},
                {xtype: 'container', padding:'10 10 10 0',flex: 3, items: [this.onInitDataGrid()]}
            ]
        })

        return panel;
    },
    /**
     * 机构单击
     * @param view
     * @param record
     * @param item
     * @param index
     * @param e
     */
    onOrgClick: function (view, record, item, index, e) {

        var grid = Ext.ComponentQuery.query('depNoAreaGridPanel')[0];
        grid.orgId = record.data.id;
        grid.orgName = record.data.name;
        var store = grid.getStore();
        store.setProxy({
            type: 'ajax',
            url: CONFIG.restRoot + '/camel/rest/deps/org/' + record.data.id
        });
        store.reload();
    },
    /**
     * 机构刷新
     */
    onOrgRefersh: function () {
        Ext.ComponentQuery.query('depNoAreaPanel')[0].down('#mainPanel>#depNoAreaOrgTreeList').getStore().reload();
    },
    /**
     * 机构展开
     */
    onOrgExpandAll: function () {
        Ext.ComponentQuery.query('depNoAreaPanel')[0].down('#mainPanel>#depNoAreaOrgTreeList').expandAll(function () {
        });
    },
    /**
     * 机构收起
     */
    onOrgCollapseAll: function () {
        Ext.ComponentQuery.query('depNoAreaPanel')[0].down('#mainPanel>#depNoAreaOrgTreeList').collapseAll(function () {
        });
    },
    /**
     * 初始化机构列表.
     * @returns {Ext.panel.Panel}
     */
    onInitOrgTreeList: function () {
        var orgTreeListPanel = Ext.create('kalix.admin.orgNoArea.view.OrgNoAreaTreeList', {
            store: Ext.create('kalix.admin.orgNoArea.store.OrgNoAreaStore'),
            itemId: 'depNoAreaOrgTreeList',
            region: 'west',
            title: '机构列表',
            iconCls: 'x-fa fa-building',
            listeners: {
                itemClick: this.onOrgClick
            },
            tbar: [
                {
                    tooltip: '刷新', icon: 'admin/resources/images/arrow_refresh.png',
                    handler: this.onOrgRefersh
                },
                {
                    tooltip: '展开', icon: 'admin/resources/images/arrow_down.png',
                    handler: this.onOrgExpandAll
                },
                {
                    tooltip: '收起', icon: 'admin/resources/images/arrow_up.png',
                    handler: this.onOrgCollapseAll
                }]
        });
        return orgTreeListPanel;
    },
    /**
     * 初始化数据表格.
     * @returns {Ext.panel.Panel}
     */
    onInitDataGrid: function () {
        //Ext.QuickTips.init();
        var dataGird = Ext.create('kalix.admin.depNoArea.view.DepNoAreaGrid', {
            store: Ext.create('kalix.admin.depNoArea.store.DepNoAreaStore')
        });
        return dataGird;
    }
});