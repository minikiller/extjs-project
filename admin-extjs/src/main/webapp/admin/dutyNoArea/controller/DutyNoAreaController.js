/**
 * 部门模块控制器
 *
 * @author zangyanming <br/>
 *         date:2016-3-10
 * @version 1.0.0
 */
Ext.define('kalix.admin.dutyNoArea.controller.DutyNoAreaController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dutyNoAreaController',
    requires: [
        'kalix.admin.orgNoArea.view.OrgNoAreaTreeList',
        'kalix.admin.depNoArea.view.DepNoAreaTreeList',
        'kalix.admin.dutyNoArea.view.DutyNoAreaGrid'
    ],
    /**
     * 初始化面板.
     * @returns {Ext.panel.Panel}
     */
    onInitPanel: function () {
        var panel = Ext.create('Ext.panel.Panel', {
            layout: 'hbox',
            itemId: 'mainPanel',
            indexId: 0,
            autoScroll: true,
            items: [
                {xtype: 'container', padding:10, flex: 1, items: [this.onInitOrgTreeList()]},
                {xtype: 'container', padding:'10 10 10 0', flex: 1, items: [this.onInitDepTreeList()]},
                {xtype: 'container', padding:'10 10 10 0',flex: 3, items: [this.onInitDataGrid()]}
            ]
        });

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
        //var grid = Ext.ComponentQuery.query('depNoAreaTreeList')[0];
        //grid.orgId = record.data.id;
        //grid.orgName = record.data.name;
        //var store = grid.getStore();
        //store.setProxy({
        //    type: 'ajax',
        //    url: CONFIG.restRoot + '/camel/rest/deps/org/' + record.data.id
        //});
        //store.reload();

        var OrgTreeList=view.findParentByType('panel').findParentByType('panel').items.getAt(1).items.getAt(0);

        var store = OrgTreeList.getStore();
        store.setProxy({
            type: 'ajax',
            url: CONFIG.restRoot + '/camel/rest/deps/org/' + record.data.id
        });
        store.reload();
    },
    /**
     * 部门单击
     * @param view
     * @param record
     * @param item
     * @param index
     * @param e
     */
    onDepClick: function (view, record, item, index, e) {
        var grid = Ext.ComponentQuery.query('dutyNoAreaGridPanel')[0];
        grid.depId = record.data.id;
        grid.depName = record.data.name;
        var store = grid.getStore();
        store.setProxy({
            type: 'ajax',
            url: CONFIG.restRoot + '/camel/rest/dutys/' + record.data.id
        });
        store.reload();
    },
    /**
     * 机构刷新
     */
    onOrgRefersh: function () {
        Ext.ComponentQuery.query('dutyNoAreaPanel')[0].down('#dutyNoAreaOrgTreeList').getStore().reload();
    },
    /**
     * 机构展开
     */
    onOrgExpandAll: function () {
        Ext.ComponentQuery.query('dutyNoAreaPanel')[0].down('#dutyNoAreaOrgTreeList').expandAll(function () {
        });
    },
    /**
     * 机构收起
     */
    onOrgCollapseAll: function () {
        Ext.ComponentQuery.query('dutyNoAreaPanel')[0].down('#dutyNoAreaOrgTreeList').collapseAll(function () {
        });
    },
    /**
     * 初始化机构列表.
     * @returns {Ext.panel.Panel}
     */
    onInitOrgTreeList: function () {
        var orgTreeListPanel = Ext.create('kalix.admin.orgNoArea.view.OrgNoAreaTreeList', {
            store: Ext.create('kalix.admin.orgNoArea.store.OrgNoAreaStore',{proxy:{url:CONFIG.restRoot + '/camel/rest/orgs/'}}),
            itemId: 'dutyNoAreaOrgTreeList',
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
     * 初始化部门列表.
     * @returns {Ext.panel.Panel}
     */
    onInitDepTreeList: function () {
        var depTreeListPanel = Ext.create('kalix.admin.depNoArea.view.DepNoAreaTreeList', {
            store: Ext.create('kalix.admin.depNoArea.store.DepNoAreaStore'),
            itemId: 'dutyNoAreaDepTreeList',
            region: 'west',
            title: '部门列表',
            iconCls: 'x-fa fa-building',
            listeners: {
                itemClick: this.onDepClick
            },
            tbar: [
                {
                    tooltip: '刷新', icon: 'admin/resources/images/arrow_refresh.png',
                    handler: this.onDepRefersh
                },
                {
                    tooltip: '展开', icon: 'admin/resources/images/arrow_down.png',
                    handler: this.onDepExpandAll
                },
                {
                    tooltip: '收起', icon: 'admin/resources/images/arrow_up.png',
                    handler: this.onDepCollapseAll
                }]
        });
        return depTreeListPanel;
    },
    /**
     * 初始化数据表格.
     * @returns {Ext.panel.Panel}
     */
    onInitDataGrid: function () {
        //Ext.QuickTips.init();
        var dataGird = Ext.create('kalix.admin.dutyNoArea.view.DutyNoAreaGrid', {
            store: Ext.create('kalix.admin.dutyNoArea.store.DutyNoAreaStore')
        });
        return dataGird;
    }
});