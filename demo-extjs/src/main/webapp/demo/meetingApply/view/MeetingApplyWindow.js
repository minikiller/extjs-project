/**
 * @author zangyanming
 */

Ext.define('kalix.demo.meetingApply.view.MeetingApplyWindow', {
    extend: 'kalix.view.components.common.BaseWindow',
    requires: [
        'kalix.demo.meetingApply.view.MeetingApplyViewForm',
        'kalix.view.components.common.TableFormPanel',
        'kalix.view.components.common.TableFormField',
        'kalix.view.components.common.TableFormRadioGroup',
        'kalix.controller.BaseWindowController',
        'kalix.demo.meetingApply.viewModel.MeetingApplyViewModel',
        'kalix.view.components.common.TableFormDateTimeField'
    ],
    alias: 'widget.meetingApplyWindow',
    xtype: "meetingApplyWindow",
    viewModel: 'meetingApplyViewModel',
    controller: {
        type: 'baseWindowController',
        storeId: 'meetingApplyStore'
    },
    width: 900,
    items: [
        {
            xtype: 'baseTableForm',
            layout: {
                type: 'table',
                columns: 6
            },
            items: [
                {
                    html: '吉林动画学院会议室使用申请表',
                    colspan: 6,
                    customStyle: true,
                    bodyStyle: 'padding:10px 0px 15px 0px;font-size:25px;font-weight:bold;'
                },
                {
                    html: '申请部门',
                    required: true
                },
                {
                    colspan: 2,
                    items: [
                        {
                            xtype: 'tableFormField',
                            bind: {
                                value: '{rec.department}'
                            }
                        }
                    ]
                },
                {
                    html: '会议地点',
                    required: true
                },
                {
                    colspan: 2,
                    items: [
                        {
                            xtype: 'tableFormField',
                            bind: {
                                value: '{rec.meetingPlace}'
                            }
                        }
                    ]
                },
                {
                    html: '会议名称',
                    required: true
                },
                {
                    colspan: 5,
                    items: [
                        {
                            xtype: 'tableFormField',
                            bind: {
                                value: '{rec.meetingTopic}'
                            }
                        }
                    ]
                },
                {
                    html: '宣传需求（企划中心）'
                },
                {
                    colspan: 5,
                    customStyle: true,
                    bodyStyle: 'padding:10px 0px 0px 20px;font-size:15px;',
                    items: [
                        {
                            xtype: 'tableFormRadioGroup',
                            columns: 5,
                            fieldName: 'requirement',
                            items: [
                                {boxLabel: '照像', inputValue: '0'},
                                {boxLabel: '摄像', inputValue: '1'},
                                {boxLabel: '记者', inputValue: '2'}
                            ]
                        }
                    ]
                },
                {
                    html: '主持人',
                    required: true
                },
                {
                    colspan: 1,
                    items: [
                        {
                            xtype: 'tableFormField',
                            bind: {
                                value: '{rec.host}'
                            }
                        }
                    ]
                },
                {
                    html: '使用时间',
                    required: true
                },
                {
                    colspan: 3,
                    layout: {
                        type: 'hbox'
                    },
                    customStyle: true,
                    bodyStyle: 'padding:5px 0px 0px 0px;',
                    defaults: {
                        //width: 200
                    },
                    items: [
                        {
                            xtype: 'tableFormDateTimeField',
                            format:'Y年m月d日',
                            bind: {
                                value: '{rec.meetingDate}'
                            }
                        },
                        {
                            xtype: 'tableFormDateTimeField',
                            format:'H时i分',
                            hiddenLabel:false,
                            label:'时',
                            bind: {
                                value: '{rec.beginTime}'
                            }
                        },
                        {
                            html: '至',
                            //width: 15,
                            bodyStyle: 'font-size:15px;border:0px;padding:5px 0 0 0;'
                        },
                        {
                            xtype: 'tableFormDateTimeField',
                            format:'H时i分',
                            bind: {
                                value: '{rec.endTime}'
                            }
                        }
                    ]
                },
                {
                    html: '参会人员'
                },
                {
                    colspan: 5,
                    items: [
                        {
                            xtype: 'tableFormField',
                            bind: {
                                value: '{rec.participant}'
                            }
                        }
                    ]
                },
                {
                    html: '出席人数'
                },
                {
                    colspan: 2,
                    items: [
                        {
                            xtype: 'tableFormField',
                            bind: {
                                value: '{rec.attendance}'
                            }
                        }
                    ]
                },
                {
                    html: '设备要求'
                },
                {
                    colspan: 2,
                    items: [
                        {
                            xtype: 'tableFormField',
                            bind: {
                                value: '{rec.equipmentRequirement}'
                            }
                        }
                    ]
                },
                {
                    html: '联系人（安全责任人）'
                },
                {
                    colspan: 2,
                    items: [
                        {
                            xtype: 'tableFormField',
                            bind: {
                                value: '{rec.securityPerson}'
                            }
                        }
                    ]
                },
                {
                    html: '手机号码'
                },
                {
                    colspan: 2,
                    items: [
                        {
                            xtype: 'tableFormField',
                            bind: {
                                value: '{rec.securityTel}'
                            }
                        }
                    ]
                },
                {
                    html: '校务部文秘综合干事',
                    readOnly: true
                },
                {
                    colspan: 2,
                    items: [
                        {
                            xtype: 'tableFormField',
                            readOnly: true
                        }
                    ]
                },
                {
                    html: '校务部行政事务办主管',
                    readOnly: true
                },
                {
                    colspan: 2,
                    items: [
                        {
                            xtype: 'tableFormField',
                            readOnly: true
                        }
                    ]
                },
                {
                    html: '校务部副部长',
                    readOnly: true
                },
                {
                    colspan: 2,
                    items: [
                        {
                            xtype: 'tableFormField',
                            readOnly: true
                        }
                    ]
                },
                {
                    html: '发起部门会议纪要审批',
                    readOnly: true
                },
                {
                    colspan: 2,
                    items: [
                        {
                            xtype: 'tableFormField',
                            readOnly: true
                        }
                    ]
                }
            ]
        }
    ]
});