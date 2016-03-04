/**
 * @author chenyanxu
 */

Ext.define('kalix.demo.sealApply.view.SealApplyViewForm', {
    extend: 'kalix.view.components.common.TableFormPanel',
    requires: [
        'kalix.view.components.common.TableFormField',
        'Ext.ux.DateTimeField',
        'kalix.admin.dict.component.DictCombobox'
    ],
    alias: 'widget.sealApplyViewForm',
    xtype: "sealApplyViewForm",
    items: [
        {
            html: '吉林动画学院印章使用申请单',
            colspan: 6,
            customStyle: true,
            bodyStyle: 'padding:20px 0px 15px 0px;font-size:24px;font-weight:bold;'
        },
        {
            html: '申请部门'
        },
        {
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
            html: '用印数<br/>(份数*次数)'
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
            html: '印章类别'
        },
        {
            colspan: 5,
            customStyle: true,
            bodyStyle: 'padding:0px 0px 0px 0px;font-size:15px;',
            items: [
                {

                    xtype: 'dictCombobox',
                    readOnly: true,
                    dictType: 'sealType',
                    name: 'sealType',
                    fieldStyle: 'font-size:15px',
                    bind: {
                        value: '{rec.sealType}'
                    }

                    //xtype: 'tableFormRadioGroup',
                    //columns: 3,
                    //fieldName: 'sealType',
                    //defaults:{readOnly:true},
                    //items: [
                    //    {boxLabel: '公司公章', name: 'rn', inputValue: '0'},
                    //    {boxLabel: '公司合同专用章', name: 'rn', inputValue: '1'},
                    //    {boxLabel: '学院公章', name: 'rn', inputValue: '2'},
                    //    {boxLabel: '学院合同专用章', name: 'rn', inputValue: '3'},
                    //    {boxLabel: '法人印章', name: 'rn', inputValue: '4'}
                    //]
                }
            ]
        },
        {
            html: '经办人'
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
            html: '部门负责人'
        },
        {
            colspan: 2,
            items: [
                {
                    xtype: 'tableFormField',
                    readOnly: true,
                    bind: {
                        value: '{rec.departmentHead}'
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
                    xtype: 'tableFormField',
                    readOnly: true,
                    bind: {
                        value: '{rec.filialeHead}'
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
                    xtype: 'tableFormField',
                    readOnly: true,
                    bind: {
                        value: '{rec.counsel}'
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
                    xtype: 'tableFormField',
                    readOnly: true,
                    bind: {
                        value: '{rec.generalManager}'
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
                    xtype: 'tableFormField',
                    readOnly: true,
                    bind: {
                        value: '{rec.sealAdministrator}'
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
                    xtype: 'tableFormField',
                    readOnly: true,
                    bind: {
                        value: '{rec.remark}'
                    }
                }
            ]
        }]

});