/**
 * 工作组组件
 *
 * @author majian <br/>
 *         date:2015-7-24
 * @version 1.0.0
 */
Ext.define('kalix.admin.workgroup.view.WorkGroup', {
    extend: 'Ext.panel.Panel',
    requires: [
        'kalix.admin.workgroup.viewModel.WorkGroupViewModel',
        'kalix.admin.workgroup.controller.WorkGroupController'
    ],
    xtype: 'workGroupPanel',
    controller: 'workGroupController',
    viewModel: {
        type: 'workGroupViewModel'
    },
    items: [],
    initComponent: function () {
        var workGroupController = this.getController("workGroupController");

        this.items[0] = workGroupController.onInitPanel();

        this.callParent(arguments);
    }
});