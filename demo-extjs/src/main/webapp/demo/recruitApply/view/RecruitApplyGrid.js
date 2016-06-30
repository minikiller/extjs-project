/**
 * @author chenyanxu
 */
Ext.define('kalix.demo.recruitApply.view.RecruitApplyGrid', {
    extend: 'kalix.view.components.common.BaseGrid',
    requires: [
        'kalix.demo.recruitApply.controller.RecruitApplyGridController',
        'kalix.demo.recruitApply.store.RecruitApplyStore',
        'kalix.admin.dict.component.DictGridColumn'
    ],
    alias: 'widget.recruitApplyGrid',
    xtype: 'recruitApplyGrid',
    iconCls: 'iconfont icon-public-car',
    controller: {
        type: 'recruitApplyGridController',
        storeId: 'recruitApplyStore',
        cfgForm: 'kalix.demo.recruitApply.view.RecruitApplyWindow',
        cfgViewForm: 'kalix.demo.recruitApply.view.RecruitApplyViewWindow',
        cfgModel: 'kalix.demo.recruitApply.model.RecruitApplyModel'
    },
    store: {
        type: 'recruitApplyStore'
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
                text: '用工原因',
                dataIndex: 'reason'
            },
            {
                text: '职位名称',
                dataIndex: 'positionName'
            },
            {
                text: '拟聘人数',
                dataIndex: 'recruitCount'
            },
            {
                text: '待遇标准',
                dataIndex: 'treatmentLevel'
            },
            {
                text: '核心职责',
                dataIndex: 'coreRecruit'
            },
            {
                text: '经办人',
                dataIndex: 'createBy'
            },
            {
                text: '审批结果',
                dataIndex: 'auditResult'
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
            },
            {
                flex: 1.5,
                //width: 80,
                xtype: 'securityGridColumnCommon',
                items: [
                    {
                        iconCls: 'iconfont icon-vie-column',
                        permission: '',
                        tooltip: '查看',
                        handler: 'onView'
                    },
                    {
                        permission: '',
                        tooltip: '编辑',
                        handler: 'onEdit',
                        getClass: function (v, meta, record) {
                            if (0 != record.data.status) {
                                return "kalix_hidden";
                            }
                            return "iconfont icon-edit-column";
                        }
                    },
                    {
                        permission: '',
                        tooltip: '查看进度',
                        handler: 'onViewCurrentProcess',
                        getClass: function (v, meta, record) {
                            if (1 != record.data.status) {
                                return "kalix_hidden";
                            }
                            return "iconfont icon-current-process";
                        }
                    },
                    {
                        permission: '',
                        tooltip: '删除',
                        handler: 'onDelete',
                        getClass: function (v, meta, record) {
                            if (0 != record.data.status) {
                                return "kalix_hidden";
                            }
                            return "iconfont icon-delete";
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
