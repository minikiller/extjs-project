/**
 * 部门模块控制器
 *
 * @author majian <br/>
 *         date:2015-7-23
 * @version 1.0.0
 */
Ext.define('Kalix.admin.dep.controller.DepController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.depController',
    requires: [
        "Kalix.admin.area.view.AreaList",
        "Kalix.admin.org.view.OrgList",
        'Kalix.admin.dep.view.DepGrid'
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
            items: [this.onInitAreaList(), this.onInitOrgList(), this.onInitDataGrid()]
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
        Ext.ComponentQuery.query('depPanel')[0].down("#mainPanel>#depOrgList").getStore().reload();
    },
    /**
     * 机构展开
     */
    onOrgExpandAll: function () {
        Ext.ComponentQuery.query('depPanel')[0].down("#mainPanel>#depOrgList").expandAll(function () {
        });
    },
    /**
     * 机构收起
     */
    onOrgCollapseAll: function () {
        Ext.ComponentQuery.query('depPanel')[0].down("#mainPanel>#depOrgList").collapseAll(function () {
        });
    },
    /**
     * 区域单击
     */
    onAreaClick: function (view, record, item, index, e) {
        var orgList = Ext.ComponentQuery.query('depPanel')[0].down("#mainPanel>#depOrgList");
        var store = orgList.getStore();
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
        Ext.ComponentQuery.query('depPanel')[0].down("#mainPanel>#depAreaList").getStore().reload();
    },
    /**
     * 区域展开
     * @constructor
     */
    onAreaExpandAll: function () {
        Ext.ComponentQuery.query('depPanel')[0].down("#mainPanel>#depAreaList").expandAll(function () {
        });
    },
    /**
     * 区域收起
     * @constructor
     */
    onAreaCollapseAll: function () {
        Ext.ComponentQuery.query('depPanel')[0].down("#mainPanel>#depAreaList").collapseAll(function () {
        });
    },
    /**
     * 初始化区域列表.
     * @returns {Ext.panel.Panel}
     */
    onInitAreaList: function () {
        var areaListPanel = Ext.create("Kalix.admin.area.view.AreaList", {
            store: Ext.create("Kalix.admin.area.store.AreaStore"),
            region: "west",
            itemId: "depAreaList",
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
                    handler: this.onAreaExpandAll
                },
                {
                    text: '收起', icon: 'admin/resources/images/arrow_up.png',
                    handler: this.onAreaCollapseAll
                }]
        });
        return areaListPanel;
    },
    /**
     * 初始化机构列表.
     * @returns {Ext.panel.Panel}
     */
    onInitOrgList: function () {
        var orgListPanel = Ext.create("Kalix.admin.org.view.OrgList", {
            store: Ext.create("Kalix.admin.org.store.OrgStore"),
            itemId: "depOrgList",
            region: "west",
            title: '机构列表',
            listeners: {
                itemClick: this.onOrgClick
            },
            tbar: [
                {
                    text: '刷新', icon: 'admin/resources/images/script_go.png',
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
        return orgListPanel;
    },
    /**
     * 初始化数据表格.
     * @returns {Ext.panel.Panel}
     */
    onInitDataGrid: function () {
        var dataGird = Ext.create("Kalix.admin.dep.view.DepGrid",{
            store:Ext.create("Kalix.admin.dep.store.DepStore")
        });
        return dataGird;
    }
});