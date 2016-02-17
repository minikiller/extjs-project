/**
 * 流程定义表格
 * @author majian <br/>
 *         date:2015-7-3
 * @version 1.0.0
 */
Ext.define('kalix.workflow.processdefinition.view.ProcessDefinitionGrid', {
    extend: 'kalix.view.components.common.BaseGrid',
    requires: [
        'kalix.workflow.processdefinition.store.ProcessDefinitionStore',
        'kalix.workflow.processdefinition.controller.ProcessDefinitionGridController'
    ],
    alias: 'widget.processDefinitionGrid',
    xtype: 'processDefinitionGrid',
    controller: {
        type:'processDefinitionGridController',
        storeId:'processDefinitionStore',
        /*cfgForm: 'kalix.roffice.chance.view.TaskWindow',
        cfgViewForm: 'kalix.roffice.chance.view.TaskViewWindow',*/
        cfgModel: 'kalix.workflow.processdefinition.model.ProcessDefinitionModel'
    },
    viewModel: {
        type: 'processDefinitionViewModel'
    },
    store:{
        type:'processDefinitionStore'
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
            text: '流程定义名称',
            dataIndex: 'name'
        },
        {
            text: '关键字',
            dataIndex: 'key'
        },
        {
            text: '描述',
            dataIndex: 'description'
        },
        {
            text: '版本',
            dataIndex: 'version'
        },
        {
            text: '状态', dataIndex: 'suspensionState',
            renderer: function (value) {
            if (value == 1)
                return "有效";
            else
                return "无效";
            }
        },
        {
            header: '操作',
            xtype: "actioncolumn",
            itemId: 'operationColumn',
            items: [{
                icon: "resources/images/pencil.png",
                tooltip: '编辑',
                handler: 'onEdit'
            }, {
                icon: "resources/images/cancel.png",
                tooltip: '删除',
                handler: 'onDelete'

            }, {
                itemId: 'activateButton',
                getClass: function (v, meta, record) {
                    if (record.data.suspensionState == 1) {
                        return "kalix_stop";
                    }
                    return "kalix_start";
                },
                getTip: function (value, metadata, record, row, col, store) {
                    if (record.data.suspensionState == 1) {
                        return "无效";
                    }
                    return '有效';
                },
                handler: 'onIsActivate'
            }, {
                icon: "resources/images/magnifier.png",
                tooltip: '查看',
                handler: 'onOpenProcessDefinition'
            }]
        }
      ]}
});