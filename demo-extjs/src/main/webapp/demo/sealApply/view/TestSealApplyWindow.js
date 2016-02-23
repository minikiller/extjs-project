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
    width: 900,
    controller: {
        type: 'baseWindowController',
        storeId: 'sealApplyStore'
    },
    items: [
        {
            xtype: 'form',
            padding: 1,
            width: 900,
            bodyStyle: 'border-color:black;border-width:1px 1px 0px 1px',
            layout: {
                type: 'table',
                columns: 6
            },
            defaults: {
                height: 60,
                bodyStyle: 'padding:20px;font-size:18px;text-align:center;border-color:black;border-width:0px 1px 1px 0px',
                layout: 'fit'
            },
            listeners: {
                afterrender: function () {
                    for (var itemIndex = 0; itemIndex < this.items.getCount(); ++itemIndex) {
                        var tmpItem = this.items.getAt(itemIndex);

                        if (tmpItem.colspan) {
                            tmpItem.setWidth(this.width * tmpItem.colspan / this.layout.columns);
                        }
                        else {
                            tmpItem.setWidth(this.width / this.layout.columns);
                        }

                        if (tmpItem.config.html && tmpItem.config.html.indexOf('<br') > 0) {
                            tmpItem.setBodyStyle('padding:10px;font-size:18px;text-align:center;border-color:black;border-width:0px 1px 1px 0px');
                        }
                    }
                }
            },
            items: [{
                html: '吉林动画学院印章使用申请单',
                colspan: 6,
                bodyStyle: 'padding:15px 0px 15px 0px;font-size:24px;font-weight:bold;text-align:center;border-color:black;border-width:0px 1px 1px 0px'
            },
                {
                    html: '申请部门'
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
                    html: '申请时间'
                },
                {
                    bodyStyle: 'padding:10px 0 0 0;border-color:black;border-width:0px 1px 1px 0px',
                    items: [
                        {
                            editable: false,
                            xtype: 'datefield',
                            format: 'Y年m月d日',
                            hideLabel: true,
                            fieldStyle: 'font-size:15px'
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
                    colspan: 5,
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
                    colspan: 2,
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
                    colspan: 2,
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
                    colspan: 2,
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
                    colspan: 2,
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
                    colspan: 2,
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
                    colspan: 2,
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
                    colspan: 5,
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