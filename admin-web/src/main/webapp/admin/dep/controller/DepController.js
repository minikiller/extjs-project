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
            autoScroll: true,
            height: 630,
            items: [this.onInitOrgListPanel(),this.onInitDataGrid()]
        })

        return panel;
    },
    /**
     * 初始化机构列表.
     * @returns {Ext.panel.Panel}
     */
    onInitOrgListPanel: function () {
        var orgListPanel = Ext.create("Kalix.admin.dep.view.OrgListPanel",{
            store:Ext.create("Kalix.admin.org.store.OrgStore")
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