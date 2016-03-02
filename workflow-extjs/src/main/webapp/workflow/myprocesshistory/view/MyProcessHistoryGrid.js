/**
 * 流程历史表格
 * @author majian <br/>
 *         date:2015-7-3
 * @version 1.0.0
 */
Ext.define('kalix.workflow.myprocesshistory.view.MyProcessHistoryGrid', {
    extend: 'kalix.view.components.common.BaseGrid',
    requires: [
        'kalix.workflow.myprocesshistory.store.MyProcessHistoryStore',
        'kalix.workflow.myprocesshistory.controller.MyProcessHistoryGridController'
    ],
    alias: 'widget.myProcessHistoryGrid',
    xtype: 'myProcessHistoryGrid',
    controller: {
        type: 'myProcessHistoryGridController',
        storeId: 'myProcessHistoryStore',
        /*cfgForm: 'kalix.roffice.chance.view.TaskWindow',
         cfgViewForm: 'kalix.roffice.chance.view.TaskViewWindow',*/
        cfgModel: 'kalix.workflow.myprocesshistory.model.ProcessHistoryModel'
    },
    viewModel: {
        type: 'processHistoryViewModel'
    },
    store: {
        type: 'myProcessHistoryStore'
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
                text: '流程定义编号',
                dataIndex: 'processDefinitionId'
            },
            {
                text: '启动用户',
                dataIndex: 'startUserId'
            },
            {
                text: '开始时间',
                dataIndex: 'startTime',
                renderer: function (value) {
                    var createDate = new Date(value);
                    return createDate.format("yyyy-MM-dd hh:mm:ss");
                }
            },
            {
                text: '结束时间',
                dataIndex: 'endTime',
                renderer: function (value) {
                    if (value != null && value != "") {
                        var createDate = new Date(value);
                        return createDate.format("yyyy-MM-dd hh:mm:ss");
                    } else {
                        return "";
                    }
                }
            },
             {
                 text: '持续时长',
                 dataIndex: 'durationInMillis'
             },
            {
                text: '状态',
                dataIndex: 'status'
            },
            {
                header: '操作',
                xtype: "actioncolumn",
                items: [{
                    icon: "resources/images/workflow.png",
                    tooltip: '查看流程历史',
                    handler: 'onOpenHistoryActivity'
                }]
            }
        ]
    }
});