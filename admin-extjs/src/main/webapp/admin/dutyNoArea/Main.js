/**
 * 部门组件
 *
 * @author zangyanming <br/>
 *         date:2016-3-10
 * @version 1.0.0
 */
Ext.define('kalix.admin.dutyNoArea.Main', {
    extend: 'Ext.panel.Panel',
    requires: [
        'kalix.admin.dutyNoArea.viewModel.DutyNoAreaViewModel',
        'kalix.admin.dutyNoArea.controller.DutyNoAreaController'
    ],
    xtype: 'dutyNoAreaPanel',
    controller: 'dutyNoAreaController',
    viewModel: {
        type: 'dutyNoAreaViewModel'
    },
    items: [],
    initComponent: function () {
        var dutyNoAreaController = this.getController("dutyNoAreaController");

        this.items[0] = dutyNoAreaController.onInitPanel();

        this.callParent(arguments);
    }
});