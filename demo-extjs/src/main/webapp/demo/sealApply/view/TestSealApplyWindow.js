/**
 * @author chenyanxu
 */

Ext.define('kalix.demo.sealApply.view.TestSealApplyWindow', {
    extend: 'kalix.view.components.common.BaseWindow',
    requires: [
        'kalix.view.components.common.TableFormPanel',
        'kalix.controller.BaseWindowController',
        'kalix.demo.sealApply.viewModel.SealApplyViewModel'
    ],
    alias: 'widget.testSealApplyWindow',
    xtype: "testSealApplyWindow",
    viewModel: 'sealApplyViewModel',
    controller: {
        type: 'baseWindowController',
        storeId: 'sealApplyStore'
    },
    items: [
        {
            xtype: 'baseTableForm',
            width: 800,
            layout: {
                type: 'table',
                columns: 4
            },
            defaults: {
                height: 60,
                bodyStyle: 'padding:20px;font-size:18px;text-align:center;border-color:black;border-width:0px 1px 1px 0px',
                layout: 'fit'
            },
            items: [
                {
                    html: '吉林动画学院印章使用申请单',
                    colspan: 4,
                    bodyStyle: 'padding:15px 0px 15px 0px;font-size:24px;font-weight:bold;text-align:center;border-color:black;border-width:0px 1px 1px 0px'
                },
                {
                    html: '申请部门'
                    //bodyStyle: 'padding:20px;font-size:18px;text-align:center;border-color:black;border-width:0px 1px 1px 0px'
                },
                {
                    items: [
                        {
                            xtype: 'field',
                            hideLabel: true,
                            fieldStyle: 'font-size:15px',
                            bind: {
                                value: '{test}'
                            }
                        }
                    ]
                },
                {
                    html: '用印数<br/>（份数╳次数）'
                },
                {
                    items: [
                        {
                            xtype: 'field',
                            hideLabel: true,
                            fieldStyle: 'font-size:15px',
                            bind: {
                                value: '{test}'
                            }
                        }
                    ]
                },
                {
                    html: '印章类别'
                },
                {
                    colspan: 3,
                    bodyStyle: 'padding:0px 0px 0px 20px;font-size:15px;text-align:center;border-color:black;border-width:0px 1px 1px 0px',
                    items: [
                        {
                            xtype: 'radiogroup',
                            hideLabel: true,
                            columns: 3,
                            vertical: false,
                            items: [
                                {boxLabel: '公司公章', name: 'st', inputValue: 0},
                                {boxLabel: '公司合同专用章', name: 'st', inputValue: 1},
                                {boxLabel: '学院公章', name: 'st', inputValue: 2},
                                {boxLabel: '学院合同专用章', name: 'st', inputValue: 3},
                                {boxLabel: '法人印章', name: 'st', inputValue: 4}
                            ],
                            bind: {
                                value: '{sealType}'
                            }

                        }
                    ]
                },
                {
                    html: '经办人',
                },
                {
                    items: [
                        {
                            xtype: 'field',
                            hideLabel: true,
                            fieldStyle: 'font-size:15px',
                            bind: {
                                value: '{test}'
                            }
                        }
                    ]
                },
                {
                    html: '部门负责人'
                },
                {
                    items: [
                        {
                            xtype: 'field',
                            hideLabel: true,
                            fieldStyle: 'font-size:15px',
                            bind: {
                                value: '{test}'
                            }
                        }
                    ]
                },
                {
                    html: '分公司负责人'
                },
                {
                    items: [
                        {
                            xtype: 'field',
                            hideLabel: true,
                            fieldStyle: 'font-size:15px',
                            bind: {
                                value: '{test}'
                            }
                        }
                    ]
                },
                {
                    html: '法律顾问'
                },
                {
                    items: [
                        {
                            xtype: 'field',
                            hideLabel: true,
                            fieldStyle: 'font-size:15px',
                            bind: {
                                value: '{test}'
                            }
                        }
                    ]
                },
                {
                    html: '总经理'
                },
                {
                    items: [
                        {
                            xtype: 'field',
                            hideLabel: true,
                            fieldStyle: 'font-size:15px',
                            bind: {
                                value: '{test}'
                            }
                        }
                    ]
                },
                {
                    html: '印章专管员'
                },
                {
                    items: [
                        {
                            xtype: 'field',
                            hideLabel: true,
                            fieldStyle: 'font-size:15px',
                            bind: {
                                value: '{test}'
                            }
                        }
                    ]
                },
                {
                    html: '备注'
                },
                {
                    colspan: 3,
                    items: [
                        {
                            xtype: 'field',
                            hideLabel: true,
                            fieldStyle: 'font-size:15px',
                            bind: {
                                value: '{test}'
                            }
                        }
                    ]
                }]
        }
    ]
});