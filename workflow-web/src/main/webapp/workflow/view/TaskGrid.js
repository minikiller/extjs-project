/**
 * 流程定义表格
 * @author majian <br/>
 *         date:2015-7-3
 * @version 1.0.0
 */
Ext.define('Kalix.workflow.view.TaskGrid', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Kalix.workflow.viewModel.WorkflowViewModel',
        'Kalix.workflow.controller.TaskGridController'
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
        {text: '创建时间', dataIndex: 'createTime', width: 60},
        {
            header: '操作',
            xtype: "actioncolumn",
            width: 60,
            items: [{
                icon: "resources/images/pencil.png",
                tooltip: '修改',
                handler: 'onEdit'
            }, {
                icon: "resources/images/cancel.png",
                tooltip: '删除',
                handler: 'onDelete'

            }]
        }
    ],
    /*tbar: [
     {
     text: '新增', icon: 'admin/resources/images/group_add.png', handler: 'onAdd'
     }, "-",
     {
     text: '批量删除', icon: 'admin/resources/images/group_delete.png', handler: 'onDeleteAll'
     }, "-"],*/

});