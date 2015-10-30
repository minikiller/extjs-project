/**
 * 用户组件
 *
 * @author majian <br/>
 *         date:2015-6-18
 * @version 1.0.0
 */
Ext.define('kalix.workflow.processhistory.Main', {
    extend: 'Ext.panel.Panel',
    requires: [
        'kalix.workflow.viewModel.WorkflowViewModel',
        'kalix.workflow.processhistory.controller.ProcessHistoryController'
    ],
    controller: 'processHistoryController',
    viewModel: {
        type: 'workflowViewModel'
    },
    items: [],
    initComponent: function () {
        var processHistoryController = this.getController("processHistoryController");

        this.items[0] = processHistoryController.onInitPanel();
        /*var grid = Ext.getCmp("noticeDataGrid");
         var store = grid.getStore();
         store.load({params:{start:0, limit:10}});
         grid.getView().refresh();*/
        this.callParent(arguments);
    }
});