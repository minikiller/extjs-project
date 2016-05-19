/**
 * @author chenyanxu
 */

Ext.define('kalix.demo.mainWork.view.MainWorkWindow', {
    extend: 'kalix.view.components.common.BaseWindow',
    requires: [
        'kalix.controller.BaseWindowController',
        'kalix.demo.mainWork.viewModel.MainWorkViewModel',
        'kalix.admin.dict.component.DictCombobox',
        'Ext.ux.DateTimeField'
    ],
    alias: 'widget.mainWorkWindow',
    xtype: "mainWorkWindow",
    viewModel: 'mainWorkViewModel',
    width: 400,
    controller: {
        type: 'baseWindowController',
        storeId: 'mainWorkStore'
    },
    items: [{
        items: [
            {
                fieldLabel: '申请部门',
                bind: {
                    value: '{rec.department}'
                }
            },

            {
                fieldLabel: '用车事由',
                xtype: 'textarea',
                bind: {
                    value: '{rec.reason}'
                }
            },
            {
                fieldLabel: '乘车人数',
                xtype: 'numberfield',
                anchor: '100%',
                maxValue: 99,
                minValue: 0,
                bind: {
                    value: '{rec.usageCount}'
                }
            },
            {
                fieldLabel: '用车开始时间',
                xtype: 'datetimefield',
                bind: {
                    value: '{rec.beginDate}'
                }
            },
            {
                fieldLabel: '用车结束时间',
                xtype: 'datetimefield',
                bind: {
                    value: '{rec.endDate}'
                }
            },
            {
                fieldLabel: '用车起始地点',
                bind: {
                    value: '{rec.address}'
                }
            },
            {
                fieldLabel: '是否市内用车',
                bind: {
                    value: '{rec.city}'
                }
            },
            {
                fieldLabel: '申请人联系电话',
                bind: {
                    value: '{rec.operatorPhone}'
                }
            }
        ]
    }
    ]
});