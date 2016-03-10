/**
 * 部门组件
 *
 * @author zangyanming <br/>
 *         date:2016-3-10
 * @version 1.0.0
 */
Ext.define('kalix.admin.depNoArea.Main', {
    extend: 'Ext.panel.Panel',
    requires: [
        'kalix.admin.depNoArea.viewModel.DepNoAreaViewModel',
        'kalix.admin.depNoArea.controller.DepNoAreaController'
    ],
    xtype: 'depNoAreaPanel',
    controller: 'depNoAreaController',
    viewModel: {
        type: 'depNoAreaViewModel'
    },
    items: [],
    initComponent: function () {
        var depNoAreaController = this.getController("depNoAreaController");

        this.items[0] = depNoAreaController.onInitPanel();

        this.callParent(arguments);
    }
});