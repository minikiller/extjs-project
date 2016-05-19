/**
 * @author chenyanxu
 */

Ext.define('kalix.demo.mainWork.view.MainWorkViewForm', {
    extend: 'kalix.view.components.common.TableFormPanel',
    requires: [
        'kalix.view.components.common.TableFormField',
        'kalix.view.components.common.TableFormDateTimeField'
    ],
    alias: 'widget.mainWorkViewForm',
    xtype: "mainWorkViewForm",
    items: [
        {
            html: '吉林动画学院公务用车申请表',
            colspan: 6,
            customStyle: true,
            bodyStyle: 'padding:10px 0px 15px 0px;font-size:25px;font-weight:bold;'
        },
        {
            html: '申请部门'
        },
        {
            colspan: 2,
            items: [
                {
                    xtype: 'tableFormField',
                    readOnly: true,
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
            items: [
                {
                    xtype: 'tableFormDateTimeField',
                    readOnly: true,
                    bind: {
                        value: '{rec.applyDate}'
                    }
                }
            ]
        },
        {
            html: '用车事由'
        },
        {
            colspan: 5,
            items: [
                {
                    xtype: 'tableFormField',
                    readOnly: true,
                    bind: {
                        value: '{rec.reason}'
                    }
                }
            ]
        },
        {
            html: '乘车人数'
        },
        {
            items: [
                {
                    xtype: 'tableFormField',
                    readOnly: true,
                    bind: {
                        value: '{rec.usageCount}'
                    }
                }
            ]
        },
        {
            html: '用车时段'
        },
        {
            colspan: 3,
            layout: {
                type: 'hbox',
            },
            customStyle: true,
            bodyStyle: 'padding:5px 0px 0px 0px;',
            defaults: {
                width: 200,
                readOnly: true
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
            html: '用车起始地点'
        },
        {
            colspan: 3,
            items: [
                {
                    xtype: 'tableFormField',
                    readOnly: true,
                    bind: {
                        value: '{rec.address}'
                    }
                }
            ]
        },
        {
            html: '市内用车'
        },
        {
            customStyle: true,
            bodyStyle: 'padding:0px 0px 0px 0px;',
            items: [
                {
                    allowBlank: false,
                    readOnly: true,
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
                            if (target.bodyEl) {
                                target.bodyEl.dom.firstChild.style.border = '0px';
                            }
                        }
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
            html: '联系电话'
        },
        {
            colspan: 2,
            items: [
                {
                    xtype: 'tableFormField',
                    readOnly: true,
                    bind: {
                        value: '{rec.operatorPhone}'
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
                    xtype: 'tableFormField',
                    readOnly: true,
                    bind: {
                        value: '{rec.depUser}'
                    }
                }
            ]
        },
        {
            html: '副校级领导'
        },
        {
            colspan: 2,
            items: [
                {
                    xtype: 'tableFormField',
                    readOnly: true,
                    bind: {
                        value: '{rec.managerUser}'
                    }
                }
            ]
        },
        {
            html: '校务部'
        },
        {
            colspan: 2,
            items: [
                {
                    xtype: 'tableFormField',
                    readOnly: true,
                    bind: {
                        value: '{rec.schoolUser}'
                    }
                }
            ]
        },
        {
            html: '主管领导(市外)'
        },
        {
            colspan: 2,
            items: [
                {
                    xtype: 'tableFormField',
                    readOnly: true,
                    bind: {
                        value: '{rec.schoolManagerUser}'
                    }
                }
            ]
        }
    ]
});