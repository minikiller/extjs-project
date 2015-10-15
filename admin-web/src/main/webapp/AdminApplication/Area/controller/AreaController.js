/**
 * 区域模块控制器
 *
 * @author majian <br/>
 *         date:2015-7-21
 * @version 1.0.0
 */
Ext.define('kalix.AdminApplication.Area.controller.AreaController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.areaController',
    requires: [
        'kalix.AdminApplication.Area.view.AreaGrid'
    ],
    /**
     * 初始化面板.
     * @returns {Ext.panel.Panel}
     */
    onInitPanel: function () {

        var panel = Ext.create("Ext.panel.Panel", {
            border: false,
            autoScroll: true,
            title: "区域列表",
            height: 630,
            items: [this.onInitDataGrid()]
        })

        return panel;
    },
    /**
     * 初始化数据表格.
     * @returns {Ext.panel.Panel}
     */
    onInitDataGrid: function () {
        var dataGird = Ext.create("kalix.AdminApplication.Area.view.AreaGrid", {
            store: Ext.create("kalix.AdminApplication.Area.store.AreaStore")
        });
        return dataGird;
    }
});