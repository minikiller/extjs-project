/**
 * 用户组件
 *
 * @author majian <br/>
 *         date:2015-6-18
 * @version 1.0.0
 */
Ext.define('Kalix.workflow.view.Task', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Kalix.workflow.viewModel.WorkflowViewModel',
        'Kalix.workflow.controller.TaskController'
    ],
    controller: 'taskController',
    viewModel: {
        type: 'workflowViewModel'
    },
    items: [],
    initComponent: function () {
        var taskController = this.getController("taskController");

        this.items[0] = taskController.onInitPanel();
        /*var grid = Ext.getCmp("noticeDataGrid");
         var store = grid.getStore();
         store.load({params:{start:0, limit:10}});
         grid.getView().refresh();*/
        this.callParent(arguments);
    }
});