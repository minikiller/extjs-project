/**
 * 区域组件
 *
 * @author majian <br/>
 *         date:2015-7-24
 * @version 1.0.0
 */
Ext.define('kalix.AdminApplication.Area.Main', {
    extend: 'Ext.panel.Panel',
    requires: [
        'kalix.AdminApplication.Area.view.AreaViewModel',
        'kalix.AdminApplication.Area.controller.AreaController'
    ],
    controller: 'areaController',
    viewModel: {
        type: 'areaViewModel'
    },
    items: [],
    initComponent: function () {
        var areaController = this.getController("areaController");

        this.items[0] = areaController.onInitPanel();

        this.callParent(arguments);
    }
});