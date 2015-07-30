/**
 * 用户组件
 *
 * @author majian <br/>
 *         date:2015-6-18
 * @version 1.0.0
 */
Ext.define('Kalix.workflow.view.ProcessDefinition', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Kalix.workflow.viewModel.WorkflowViewModel',
        'Kalix.workflow.controller.ProcessDefinitionController'
    ],
    controller: 'processDefinitionController',
    viewModel: {
        type: 'workflowViewModel'
    },
    items: [],
    initComponent: function () {
        var processDefinitionController = this.getController("processDefinitionController");

        this.items[0] = processDefinitionController.onInitPanel();
        /*var grid = Ext.getCmp("noticeDataGrid");
         var store = grid.getStore();
         store.load({params:{start:0, limit:10}});
         grid.getView().refresh();*/
        this.callParent(arguments);
    }
});