/**
 * 流程定义表格
 * @author majian <br/>
 *         date:2015-7-3
 * @version 1.0.0
 */
Ext.define('kalix.workflow.view.ActivityHistoryGrid', {
    extend: 'Ext.grid.Panel',
    requires: [
        'kalix.workflow.viewModel.WorkflowViewModel',
    ],
    alias: 'widget.activityHistoryGrid',
    xtype: 'activityHistoryGrid',
    viewModel: {
        type: 'workflowViewModel'
    },
    autoLoad: true,
    stripeRows: true,
    manageHeight: true,
    selModel: {selType: 'checkboxmodel', mode: "SIMPLE"},
    columns: [
        {text: '编号', dataIndex: 'id', width: 100},
        {text: '节点名称', dataIndex: 'activityName', width: 120},
        {text: '执行人', dataIndex: 'assignee', width: 120},

        {
            text: '开始时间', dataIndex: 'startTime', width: 160, renderer: function (value) {
            var createDate = new Date(value);
            return createDate.format("yyyy-MM-dd hh:mm:ss");
        }
        },
        {
            text: '结束时间', dataIndex: 'endTime', width: 60, renderer: function (value) {
            if (value != null) {
                var createDate = new Date(value);
                return createDate.format("yyyy-MM-dd hh:mm:ss");
            }
            else {
                return "";
            }
        }
        },
        {
            text: '审批意见', dataIndex: 'comment', width: 60
        },
        {text: '任务编号', dataIndex: 'taskId', width: 80},


    ],
    /*tbar: [
     {
     text: '添加', icon: 'admin/resources/images/group_add.png', handler: 'onAdd'
     }, "-",
     {
     text: '批量删除', icon: 'admin/resources/images/group_delete.png', handler: 'onDeleteAll'
     }, "-"],*/

});