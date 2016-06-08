/**
 * @author chenyanxu
 */
Ext.define('kalix.demo.sealApply.view.SealApplyGrid', {
    extend: 'kalix.view.components.common.BaseGrid',
    requires: [
        'kalix.demo.sealApply.controller.SealApplyGridController',
        'kalix.demo.sealApply.store.SealApplyStore',
        'kalix.admin.dict.component.DictGridColumn'
    ],
    alias: 'widget.sealApplyGrid',
    xtype: 'sealApplyGrid',
    controller: {
        type: 'sealApplyGridController',
        storeId: 'sealApplyStore',
        cfgForm: 'kalix.demo.sealApply.view.SealApplyWindow',
        cfgViewForm: 'kalix.demo.sealApply.view.SealApplyViewWindow',
        cfgModel: 'kalix.demo.sealApply.model.SealApplyModel'
    },
    store: {
        type: 'sealApplyStore'
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
                dataIndex: 'id'
            },
            {
                text: '申请部门',
                dataIndex: 'department'
            },

            {
                text: '申请时间',
                dataIndex: 'creationDate'
            },
            {
                text: '用印数',
                dataIndex: 'usageCount'
            },
            {
                text: '印章类别',
                xtype: 'dictGridColumn',
                dictType: 'sealType',
                dataIndex: 'sealType',
                renderer: null
            },
            {
                text: '经办人',
                dataIndex: 'createBy'
            },
            {
                text: '当前环节',
                dataIndex: 'currentNode'
            },
            {
                text: '工作流状态',
                xtype: 'dictGridColumn',
                dictType: 'workflowStatus',
                dataIndex: 'status',
                colorConfig: {
                    '结束': 'red',
                    'default': 'blue'
                },
                renderer: null
            }

            ,
            {
                flex: 1.5,
                xtype: 'securityGridColumnCommon',
                items: [
                    {
                        iconCls: 'iconfont icon-view-column',
                        permission: '',
                        tooltip: '查看',
                        handler: 'onView'
                    },
                    {
                        //icon: "resources/images/workflow.png",
                        permission: '',
                        tooltip: '查看当前流程',
                        handler: 'onViewCurrentProcess',
                        getClass: function (v, meta, record) {
                            if (1!= record.data.status) {
                                return "kalix_hidden";
                            }
                            return "iconfont icon-workflow-view-column";
                        }
                    },
                    {
                        permission: '',
                        tooltip: '删除',
                        handler: 'onDelete',
                        getClass: function (v, meta, record) {
                            if (0 != record.data.status) {
                                return "kalix_hidden";
                            }else{
                                return "iconfont icon-delete";
                            }
                        }
                    },
                    {
                        getClass: function (v, meta, record) {
                            if (record.data.status) {
                                return "kalix_hidden";
                            }
                            return "iconfont icon-start";
                        },
                        getTip: function (value, metadata, record, row, col, store) {
                            if (record.data.status) {
                                return "停止";
                            }
                            return '启动';
                        },
                        permission: '',
                        handler: 'onWorkFlowStart'
                    },
                    {
                        iconCls: 'iconfont icon-attachment-column',
                        permission: '',
                        tooltip: '附件管理',
                        handler: 'onAttachmentManage'
                    }
                ]
            }
        ]
    },
    tbar: {
        xtype: 'securityToolbar',
        verifyItems: [
            {
                text: '添加',
                xtype: 'button',
                permission: '',
                iconCls: 'iconfont icon-add',
                handler: 'onAdd'
            }
        ]
    }
});
