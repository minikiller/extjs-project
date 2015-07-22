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
        'Kalix.admin.org.view.OrgGrid'
    ],
    /**
     * 初始化面板.
     * @returns {Ext.panel.Panel}
     */
    onInitPanel: function () {

        var panel = Ext.create("Ext.panel.Panel", {
            border: false,
            autoScroll: true,
            height: 630,
            items: [ this.onInitDataGrid()]
        })

        return panel;
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