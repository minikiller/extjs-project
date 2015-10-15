/**
 * 部门模块控制器
 *
 * @author majian <br/>
 *         date:2015-7-23
 * @version 1.0.0
 */
Ext.define('kalix.AdminApplication.Dep.controller.DepController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.depController',
    requires: [
        "kalix.AdminApplication.Area.view.AreaTreeList",
        "kalix.AdminApplication.Org.view.OrgTreeList",
        'kalix.AdminApplication.Dep.view.DepGrid'
    ],
    /**
     * 初始化面板.
     * @returns {Ext.panel.Panel}
     */
    onInitPanel: function () {

        var panel = Ext.create("Ext.panel.Panel", {
            border: false,
            layout: "border",
            itemId: 'mainPanel',
            autoScroll: true,
            height: 630,
            items: [this.onInitAreaTreeList(), this.onInitOrgTreeList(), this.onInitDataGrid()]
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

        var grid = Ext.ComponentQuery.query('depGridPanel')[0];
        grid.orgId = record.data.id;
        grid.orgName = record.data.name;
        var store = grid.getStore();
        store.setProxy({
            type: "ajax",
            url: '/kalix/camel/rest/deps/org/' + record.data.id
        });
        store.reload();
    },
    /**
     * 机构刷新
     */
    onOrgRefersh: function () {
        Ext.ComponentQuery.query('depPanel')[0].down("#mainPanel>#depOrgTreeList").getStore().reload();
    },
    /**
     * 机构展开
     */
    onOrgExpandAll: function () {
        Ext.ComponentQuery.query('depPanel')[0].down("#mainPanel>#depOrgTreeList").expandAll(function () {
        });
    },
    /**
     * 机构收起
     */
    onOrgCollapseAll: function () {
        Ext.ComponentQuery.query('depPanel')[0].down("#mainPanel>#depOrgTreeList").collapseAll(function () {
        });
    },
    /**
     * 区域单击
     */
    onAreaClick: function (view, record, item, index, e) {
        var OrgTreeList = Ext.ComponentQuery.query('depPanel')[0].down("#mainPanel>#depOrgTreeList");
        var store = OrgTreeList.getStore();
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
        Ext.ComponentQuery.query('depPanel')[0].down("#mainPanel>#depAreaTreeList").getStore().reload();
    },
    /**
     * 区域展开
     * @constructor
     */
    onAreaExpandAll: function () {
        Ext.ComponentQuery.query('depPanel')[0].down("#mainPanel>#depAreaTreeList").expandAll(function () {
        });
    },
    /**
     * 区域收起
     * @constructor
     */
    onAreaCollapseAll: function () {
        Ext.ComponentQuery.query('depPanel')[0].down("#mainPanel>#depAreaTreeList").collapseAll(function () {
        });
    },
    /**
     * 初始化区域列表.
     * @returns {Ext.panel.Panel}
     */
    onInitAreaTreeList: function () {
        var areaTreeListPanel = Ext.create("kalix.AdminApplication.Area.view.AreaTreeList", {
            store: Ext.create("kalix.AdminApplication.Area.store.AreaStore"),
            region: "west",
            itemId: "depAreaTreeList",
            title: '区域列表',
            listeners: {
                itemClick: this.onAreaClick
            },
            tbar: [
                {
                    text: '刷新', icon: 'admin/resources/images/arrow_refresh.png',
                    handler: this.onAreaRefersh
                },
                {
                    text: '展开', icon: 'admin/resources/images/arrow_down.png',
                    handler: this.onAreaExpandAll
                },
                {
                    text: '收起', icon: 'admin/resources/images/arrow_up.png',
                    handler: this.onAreaCollapseAll
                }]
        });
        return areaTreeListPanel;
    },
    /**
     * 初始化机构列表.
     * @returns {Ext.panel.Panel}
     */
    onInitOrgTreeList: function () {
        var orgTreeListPanel = Ext.create("kalix.AdminApplication.Org.view.OrgTreeList", {
            store: Ext.create("kalix.AdminApplication.Org.store.OrgStore"),
            itemId: "depOrgTreeList",
            region: "west",
            title: '机构列表',
            listeners: {
                itemClick: this.onOrgClick
            },
            tbar: [
                {
                    text: '刷新', icon: 'admin/resources/images/arrow_refresh.png',
                    handler: this.onOrgRefersh
                },
                {
                    text: '展开', icon: 'admin/resources/images/arrow_down.png',
                    handler: this.onOrgExpandAll
                },
                {
                    text: '收起', icon: 'admin/resources/images/arrow_up.png',
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
        var dataGird = Ext.create("kalix.AdminApplication.Dep.view.DepGrid",{
            store:Ext.create("kalix.AdminApplication.Dep.store.DepStore")
        });
        return dataGird;
    }
});