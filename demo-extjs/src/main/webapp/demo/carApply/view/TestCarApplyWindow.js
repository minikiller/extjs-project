/**
 * @author chenyanxu
 */

Ext.define('kalix.demo.carApply.view.TestCarApplyWindow', {
    extend: 'kalix.view.components.common.BaseWindow',
    requires: [
        'kalix.view.components.common.TableFormPanel',
        'kalix.view.components.common.TableFormField',
        'kalix.controller.BaseWindowController',
        'kalix.demo.carApply.viewModel.CarApplyViewModel',
        'kalix.view.components.common.TableFormDateTimeField'
    ],
    alias: 'widget.carApplyWindow',
    xtype: "carApplyWindow",
    viewModel: 'carApplyViewModel',
    controller: {
        type: 'baseWindowController',
        storeId: 'carApplyStore'
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
                    html: '吉林动画学院公务用车申请表',
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
                    html: '申请时间'
                },
                {
                    colspan: 2,
                    customStyle: true,
                    items: [
                        {
                            xtype: 'tableFormDateTimeField',
                            readOnly: true,
                            bind: {value: '{rec.applyDate}'}
                        }
                    ]
                },
                {
                    html: '用车事由',
                    required: true
                },
                {
                    colspan: 5,
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
                    html: '乘车人数',
                    required: true
                },
                {
                    items: [
                        {
                            xtype: 'tableFormField',
                            bind: {
                                value: '{rec.usageCount}'
                            }
                        }
                    ]
                },
                {
                    html: '用车时段',
                    required: true
                },
                {
                    colspan: 3,
                    layout: {
                        type: 'hbox',
                    },
                    customStyle: true,
                    bodyStyle: 'padding:5px 0px 0px 0px;',
                    defaults: {
                        width: 210,
                    },
                    items: [
                        {
                            xtype: 'tableFormDateTimeField',
                            bind: {
                                value: '{rec.beginDate}'
                            }
                        },
                        {
                            html: '至',
                            width: 15,
                            bodyStyle: 'font-size:15px;border:0px;padding:5px 0 0 0;',
                        },
                        {
                            xtype: 'tableFormDateTimeField',
                            bind: {
                                value: '{rec.endDate}'
                            }
                        }
                    ]
                },
                {
                    html: '用车起始地点',
                    required: true
                },
                {
                    colspan: 3,
                    items: [
                        {
                            xtype: 'tableFormField',
                            bind: {
                                value: '{rec.address}'
                            }
                        }
                    ]
                },
                {
                    html: '市内用车',
                    required: true
                },
                {
                    customStyle: true,
                    bodyStyle: 'padding:0px 10px 0px 0px;',
                    items: [
                        {
                            allowBlank: false,
                            xtype: 'combobox',
                            editable: false,
                            valueField: 'key',
                            displayField: 'name',
                            fieldStyle: 'font-size:15px;text-align:center;background:transparent;',
                            store: {
                                data: [
                                    {'name': '是', 'key': true},
                                    {'name': '否', 'key': false}
                                ]
                            },
                            bind: {
                                value: '{rec.city}'
                            },
                            listeners: {
                                render: function (target) {
                                    target.bodyEl.dom.firstChild.style.border = '0px';
                                }
                            }
                        }
                    ]
                },
                {
                    html: '申请人',
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
                    html: '联系电话',
                    required: true
                },
                {
                    colspan: 2,
                    items: [
                        {
                            xtype: 'tableFormField',
                            bind: {
                                value: '{rec.operatorPhone}'
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
                    html: '副校级领导',
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
                    html: '校务部',
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
                    html: '主管领导(市外)',
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