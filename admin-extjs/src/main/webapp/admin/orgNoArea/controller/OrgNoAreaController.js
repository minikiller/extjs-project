/**
 * 机构模块控制器
 *
 * @author zangyanming <br/>
 *         date:2016-3-10
 * @version 1.0.0
 */
Ext.define('kalix.admin.orgNoArea.controller.OrgNoAreaController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.orgNoAreaController',
    requires: [
        'kalix.admin.orgNoArea.view.OrgNoAreaGrid'
    ],
    /**
     * 初始化面板.
     * @returns {Ext.panel.Panel}
     */
    onInitPanel: function () {
        var panel = Ext.create('Ext.panel.Panel', {
            border: false,
            layout: 'hbox',
            autoScroll: true,
            itemId: 'mainPanel',
            items: [
                {xtype:'container', flex: 3, padding:'10 10 10 0',items:[this.onInitDataGrid()]}]
        })

        return panel;
    },
    /**
     * 初始化数据表格.
     * @returns {Ext.panel.Panel}
     */
    onInitDataGrid: function () {
        var dataGird = Ext.create('kalix.admin.orgNoArea.view.OrgNoAreaGrid', {
            store: Ext.create('kalix.admin.orgNoArea.store.OrgNoAreaStore')
        });
        return dataGird;
    }
});