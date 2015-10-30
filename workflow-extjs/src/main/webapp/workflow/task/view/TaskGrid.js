/**
 * 流程定义表格
 * @author majian <br/>
 *         date:2015-7-3
 * @version 1.0.0
 */
Ext.define('kalix.workflow.task.view.TaskGrid', {
    extend: 'Ext.grid.Panel',
    requires: [
        'kalix.workflow.viewModel.WorkflowViewModel',
        'kalix.workflow.task.controller.TaskGridController'
    ],
    alias: 'widget.taskGrid',
    xtype: 'taskGrid',
    controller: 'taskGridController',
    viewModel: {
        type: 'workflowViewModel'
    },
    autoLoad: true,
    stripeRows: true,
    manageHeight: true,
    selModel: {selType: 'checkboxmodel', mode: "SIMPLE"},
    columns: [
        {text: '编号', dataIndex: 'id', width: 100},
        {text: '名称', dataIndex: 'name', width: 120},

        {text: '描述', dataIndex: 'description', width: 160},
        {text: '执行人', dataIndex: 'assignee', width: 80},
        {
            text: '创建时间', dataIndex: 'createTime', width: 60, renderer: function (value) {
            var createDate = new Date(value);
            return createDate.format("yyyy-MM-dd hh:mm:ss");
        }
        },
        {
            header: '操作',
            xtype: "actioncolumn",
            width: 80,
            items: [{
                icon: "resources/images/magnifier.png",
                tooltip: '查看',
                handler: 'onOpenCurrentProcess'
            },
                {
                    icon: "resources/images/control_play_blue.png",
                    tooltip: '处理',
                    handler: 'onCompleteTask'
                }]
        }
    ]
    /*tbar: [
     {
     text: '新增', icon: 'admin/resources/images/group_add.png', handler: 'onAdd'
     }, "-",
     {
     text: '批量删除', icon: 'admin/resources/images/group_delete.png', handler: 'onDeleteAll'
     }, "-"],*/

});