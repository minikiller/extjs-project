/**
 * 待办任务定义表格
 * @author majian <br/>
 *         date:2015-7-3
 * @version 1.0.0
 */
Ext.define('kalix.workflow.task.view.TaskGrid', {
    extend: 'kalix.view.components.common.BaseGrid',
    requires: [
        'kalix.workflow.task.controller.TaskGridController',
        'kalix.workflow.task.store.TaskStore'
    ],
    alias: 'widget.taskGrid',
    xtype: 'taskGrid',
    controller: {
        type: 'taskGridController',
        storeId: 'taskStore',
        /*cfgForm: 'kalix.roffice.chance.view.TaskWindow',
         cfgViewForm: 'kalix.roffice.chance.view.TaskViewWindow',*/
        cfgModel: 'kalix.workflow.task.model.TaskModel'
    },
    viewModel: {
        type: 'taskViewModel'
    },
    store: {
        type: 'taskStore'
    },
    columns: {
        defaults: {
            flex: 1,
            renderer: 'addTooltip'
        },
        items: [
            {
                xtype: "rownumberer",
                text: "行号",
                width: 50,
                flex: 0,
                align: 'center',
                renderer: null
            },
            {
                text: '编号',
                dataIndex: 'id',
                hidden: true
            },
            {
                text: '业务主键',
                dataIndex: 'businessKey'
            },
            {
                text: '任务名称',
                dataIndex: 'name'
            },
            {
                text: '任务描述',
                dataIndex: 'description'
            },
            /*{
             text: '执行人',
             dataIndex: 'assignee'
             },*/
            {
                text: '创建时间',
                dataIndex: 'createTime'
            },
            {
                header: '操作',
                xtype: "actioncolumn",
                width: 80,
                items: [
                    {
                        icon: "resources/images/magnifier.png",
                        tooltip: '查看进度',
                        handler: 'onOpenCurrentProcess'
                    },
                     {
                         icon: "resources/images/workflow.png",
                         tooltip: '查看流程历史',
                         handler: 'onOpenHistoryActivity'
                     },
                    {
                        icon: "admin/resources/images/control_play_blue.png",
                        tooltip: '流程审批',
                        handler: 'onCompleteTask'
                    }
                ]
            }]
    }
});