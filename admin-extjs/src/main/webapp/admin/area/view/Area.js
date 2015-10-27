/**
 * 区域组件
 *
 * @author majian <br/>
 *         date:2015-7-24
 * @version 1.0.0
 */
Ext.define('Kalix.admin.area.view.Area', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Kalix.admin.area.viewModel.AreaViewModel',
        'Kalix.admin.area.controller.AreaController'
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