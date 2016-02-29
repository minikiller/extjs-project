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
        'Ext.ux.DateTimeField'
    ],
    alias: 'widget.carApplyWindow',
    xtype: "carApplyWindow",
    viewModel: 'carApplyViewModel',
    controller: {
        type: 'baseWindowController',
        storeId: 'carApplyStore'
    },
    width: 840,
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
                    bodyStyle: 'padding:15px 0px 15px 0px;font-size:30px;font-weight:bold;'
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
                    html: '申请时间',
                    readOnly: true
                },
                {
                    colspan: 2,
                    items: [
                        {
                            xtype: 'tableFormField',
                            readOnly: true,
                            bind: {
                                value: '{rec.creationDate}'
                            }
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
                        type: 'absolute'
                    },
                    customStyle: true,
                    bodyStyle: 'padding:0px 0px 0px 0px;',
                    defaults: {
                        width: 415,
                        fieldStyle: 'font-size:15px;text-align:center;',
                        editable: false
                    },
                    items: [
                        {
                            xtype: 'datetimefield',
                            y: -2,
                            format: '开始: Y年m月d日 H时i分',
                            bind: {
                                value: '{rec.beginDate}'
                            }
                        },
                        {
                            xtype: 'datetimefield',
                            y: 25,
                            format: '结束: Y年m月d日 H时i分',
                            bind: {
                                value: '{rec.endDate}'
                            }
                        }
                    ]
                },
                {
                    html: '用车起始<br/>地点',
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
                    bodyStyle: 'padding:0px 0px 0px 0px;',
                    items: [
                        {
                            allowBlank: false,
                            xtype: 'combobox',
                            editable: false,
                            valueField: 'key',
                            displayField: 'name',
                            fieldStyle: 'font-size:15px;text-align:center;',
                            store: {
                                data: [
                                    {'name': '是', 'key': true},
                                    {'name': '否', 'key': false}
                                ]
                            },
                            bind: {
                                value: '{rec.city}'
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
                    html: '申请人<br/>联系电话',
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
                    html: '申请部门<br/>负责人',
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
                    html: '副校级领导审核',
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
                    html: '校务部主管<br/>领导(市外)',
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