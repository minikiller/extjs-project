/**
 * @author chenyanxu
 */

Ext.define('kalix.demo.recruitApply.view.RecruitApplyWindow', {
    extend: 'kalix.view.components.common.BaseWindow',
    requires: [
        'kalix.controller.BaseWindowController',
        'kalix.demo.recruitApply.controller.RecruitApplyGridController',
        'kalix.demo.recruitApply.view.RecruitApplyViewForm',
        'kalix.demo.recruitApply.viewModel.RecruitApplyViewModel',
        'kalix.view.components.common.TableFormDateTimeField',
        'kalix.view.components.common.TableFormPanel',
        'kalix.view.components.common.TableFormField',
        'kalix.admin.dict.component.DictCombobox'
    ],
    alias: 'widget.recruitApplyWindow',
    xtype: "recruitApplyWindow",
    viewModel: 'recruitApplyViewModel',
    controller: {
        type: 'baseWindowController',
        storeId: 'recruitApplyStore'
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
                    html: '吉林动画学院用工招聘申请表',
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
                    html: '申请事由',
                    required: true
                },
                {
                    colspan: 2,
                    items: [
                        {
                            xtype: 'tableFormField',
                            bind: {
                                value: '{rec.reason}'
                            }
                        }
                    ]
                },
                {
                    html: '拟聘人数',
                    required: true
                },
                {
                    colspan: 2,
                    items: [
                        {
                            xtype: 'tableFormField',
                            bind: {
                                value: '{rec.recruitCount}'
                            }
                        }
                    ]
                },
                {
                    html: '定编人数',
                    required: true
                },
                {
                    colspan: 2,
                    items: [
                        {
                            xtype: 'tableFormField',
                            bind: {
                                value: '{rec.allocationCout}'
                            }
                        }
                    ]
                },
                {
                    html: '现有人数',
                    required: true
                },
                {
                    colspan: 2,
                    items: [
                        {
                            xtype: 'tableFormField',
                            bind: {
                                value: '{rec.existCount}'
                            }
                        }
                    ]
                },
                {
                    html: '直接上级',
                    required: true
                },
                {
                    colspan: 2,
                    items: [
                        {
                            xtype: 'tableFormField',
                            bind: {
                                value: '{rec.leaderName}'
                            }
                        }
                    ]
                },
                {
                    html: '待遇标准',
                    required: true
                },
                {
                    colspan: 2,
                    items: [
                        {
                            xtype: 'tableFormField',
                            bind: {
                                value: '{rec.treatmentLevel}'
                            }
                        }
                    ]
                },
                {
                    html: '核心职责',
                    required: true
                },
                {
                    colspan: 2,
                    items: [
                        {
                            xtype: 'tableFormField',
                            bind: {
                                value: '{rec.coreRecruit}'
                            }
                        }
                    ]
                },
                {
                    html: '常规职责',
                    required: true
                },
                {
                    colspan: 2,
                    items: [
                        {
                            xtype: 'tableFormField',
                            bind: {
                                value: '{rec.commonRecruit}'
                            }
                        }
                    ]
                },
                {
                    html: '任职基本素质条件',
                    required: true
                },
                {
                    colspan: 2,
                    items: [
                        {
                            xtype: 'tableFormField',
                            bind: {
                                value: '{rec.baseCondition}'
                            }
                        }
                    ]
                },
                {
                    html: '建议招聘方式',
                    required: true
                },
                {
                    colspan: 2,
                    items: [
                        {
                            xtype: 'tableFormField',
                            bind: {
                                value: '{rec.recruitType}'
                            }
                        }
                    ]
                },
                {
                    html: '申请人'
                },
                {
                    colspan: 2,
                    items: [
                        {
                            xtype: 'tableFormField',
                            readOnly: true,
                            bind: {
                                value: '{rec.createBy}'
                            }
                        }
                    ]
                },
                {
                    html: '部门负责人',
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
                    html: '人力资源处长',
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