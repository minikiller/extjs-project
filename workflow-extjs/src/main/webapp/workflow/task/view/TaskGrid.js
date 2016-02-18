/**
 * 代办任务定义表格
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
        type:'taskGridController',
        storeId:'taskStore',
        /*cfgForm: 'kalix.roffice.chance.view.TaskWindow',
        cfgViewForm: 'kalix.roffice.chance.view.TaskViewWindow',*/
        cfgModel: 'kalix.workflow.task.model.TaskModel'
    },
    viewModel: {
        type: 'taskViewModel'
    },
    store:{
        type:'taskStore'
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
            text: '任务名称',
            dataIndex: 'name'
        },
        {
            text: '业务主键',
            dataIndex: 'businessKey'
        },
        {
            text: '描述',
            dataIndex: 'description'
        },
        {
            text: '执行人',
            dataIndex: 'assignee'
        },
        {
            text: '创建时间',
            dataIndex: 'createTime',
            renderer: function (value) {
                        if (value != null && value != "") {
                            var createDate = new Date(value);
                            return createDate.format("yyyy-MM-dd hh:mm:ss");
                        } else {
                            return "";
                        }
        }},
        {
            header: '操作',
            xtype: "actioncolumn",
            width: 80,
            items: [{
                icon: "admin/resources/images/magnifier.png",
                tooltip: '查看',
                handler: 'onOpenCurrentProcess'
            },
                {
                    icon: "admin/resources/images/control_play_blue.png",
                    tooltip: '处理',
                    handler: 'onCompleteTask'
                }]
        }]
        }
});