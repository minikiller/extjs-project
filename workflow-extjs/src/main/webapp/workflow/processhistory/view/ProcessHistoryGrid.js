/**
 * 流程定义表格
 * @author majian <br/>
 *         date:2015-7-3
 * @version 1.0.0
 */
Ext.define('kalix.workflow.processhistory.view.ProcessHistoryGrid', {
    extend: 'Ext.grid.Panel',
    requires: [
        'kalix.workflow.viewModel.WorkflowViewModel',
        'kalix.workflow.processhistory.controller.ProcessHistoryGridController'
    ],
    alias: 'widget.processHistoryGrid',
    xtype: 'processHistoryGrid',
    controller: 'processHistoryGridController',
    viewModel: {
        type: 'workflowViewModel'
    },
    autoLoad: true,
    stripeRows: true,
    manageHeight: true,
    selModel: {selType: 'checkboxmodel', mode: "SIMPLE"},
    columns: [
        {text: '编号', dataIndex: 'id', width: 100},
        {text: '业务主键', dataIndex: 'businessKey', width: 120},
        {text: '流程id', dataIndex: 'processDefinitionId', width: 120},
        {text: '启动用户id', dataIndex: 'startUserId', width: 80},
        {
            text: '开始时间', dataIndex: 'startTime', width: 160, renderer: function (value) {
            var createDate = new Date(value);
            return createDate.format("yyyy-MM-dd hh:mm:ss");
        }
        },
        {
            text: '结束时间', dataIndex: 'endTime', width: 60, renderer: function (value) {
            if (value != null && value != "") {
                var createDate = new Date(value);
                return createDate.format("yyyy-MM-dd hh:mm:ss");
            } else {
                return "";
            }
        }
        },
        {
            text: '状态', dataIndex: 'status', width: 60
        },
        {
            header: '操作',
            xtype: "actioncolumn",
            width: 60,
            items: [{
                icon: "resources/images/magnifier.png",
                tooltip: '查看',
                handler: 'onOpenHistoryActivity'
            },]
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