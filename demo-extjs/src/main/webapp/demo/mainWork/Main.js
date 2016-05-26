/**
 * @author chenyanxu
 */
Ext.define('kalix.demo.mainWork.Main', {
    //extend: 'kalix.container.BaseContainer',
    extend: 'Ext.container.Container',
    requires: [
        'kalix.demo.mainWork.view.dashboard.DashBoardExtend',
        'kalix.workflow.processdefinition.viewModel.ProcessDefinitionViewModel',
    ],
    viewModel:'processDefinitionViewModel',
    items: [
        {
            xtype: 'dashboardextend'
        }
    ]
});
