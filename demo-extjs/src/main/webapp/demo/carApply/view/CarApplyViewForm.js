/**
 * @author chenyanxu
 */

Ext.define('kalix.demo.carApply.view.CarApplyViewForm', {
    extend: 'kalix.view.components.common.TableFormPanel',
    requires: [
        'kalix.view.components.common.TableFormField',
        'Ext.ux.DateTimeField'
    ],
    alias: 'widget.carApplyViewForm',
    xtype: "carApplyViewForm",
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
                    xtype: 'tableFormField',
                    readOnly: true,
                    bind: {
                        value: '{rec.creationDate}'
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
                type: 'absolute'
            },
            customStyle: true,
            bodyStyle: 'padding:0px 0px 0px 0px;',
            defaults: {
                width: 210,
                fieldStyle: 'font-size:15px;text-align:center;',
                readOnly: true,
                height: 42,
                border: false,
                y: -1,
                x: -1
            },
            items: [
                {
                    xtype: 'datetimefield',
                    format: 'Y年m月d日 H时i分',
                    bind: {
                        value: '{rec.beginDate}'
                    }
                },
                {
                    xtype: 'datetimefield',
                    x: 232,
                    format: 'Y年m月d日 H时i分',
                    bind: {
                        value: '{rec.endDate}'
                    }
                },
                {
                    html: '至',
                    width: 35,
                    bodyStyle: 'font-size:15px;padding:10px;',
                    x: 200
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