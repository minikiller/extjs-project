/**
 * @author zangyanming
 */
Ext.define('kalix.demo.meetingApply.view.MeetingApplyGrid', {
    extend: 'kalix.view.components.common.BaseGrid',
    requires: [
        'kalix.demo.meetingApply.controller.MeetingApplyGridController',
        'kalix.demo.meetingApply.store.MeetingApplyStore',
        'kalix.admin.dict.component.DictGridColumn'
    ],
    alias: 'widget.meetingApplyGrid',
    xtype: 'meetingApplyGrid',
    iconCls: 'iconfont icon-meeting-room',
    controller: {
        type: 'meetingApplyGridController',
        storeId: 'meetingApplyStore',
        cfgForm: 'kalix.demo.meetingApply.view.MeetingApplyWindow',
        cfgViewForm: 'kalix.demo.meetingApply.view.MeetingApplyViewWindow',
        cfgModel: 'kalix.demo.meetingApply.model.MeetingApplyModel'
    },
    store: {
        type: 'meetingApplyStore'
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
                text: '会议名称',
                dataIndex: 'meetingTopic'
            },
            {
                text: '会议地点',
                dataIndex: 'meetingroomName'
            },
            {
                text: '会议日期',
                dataIndex: 'meetingDate',
                xtype: 'datecolumn',
                format:'Y年m月d日',
                renderer: null
            },
            {
                text: '开始时间',
                dataIndex: 'beginTime',
                xtype: 'datecolumn',
                format:'H时i分',
                renderer: null
            },
            {
                text: '结束时间',
                dataIndex: 'endTime',
                xtype: 'datecolumn',
                format:'H时i分',
                renderer: null
            },
            {
                text: '联系人',
                dataIndex: 'securityPerson'
            },
            {
                text: '联系人电话',
                dataIndex: 'securityTel'
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
                        iconCls: 'iconfont icon-view-column',
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
                            return "icon-start";
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
            },
            {
                text: '会议室占用情况',
                xtype: 'button',
                permission: '',
                iconCls: 'iconfont icon-meeting-room-reservation',
                handler: 'onReservation'
            }
        ]
    }
});
