/**
 * @author chenyanxu
 */

Ext.define('kalix.demo.carApply.view.CarApplyWindow', {
    extend: 'kalix.view.components.common.BaseWindow',
    requires: [
        'kalix.controller.BaseWindowController',
        'kalix.demo.carApply.viewModel.CarApplyViewModel',
        'kalix.admin.dict.component.DictCombobox'
    ],
    alias: 'widget.carApplyWindow',
    xtype: "carApplyWindow",
    viewModel: 'carApplyViewModel',
    width: 400,
    controller: {
        type: 'baseWindowController',
        storeId: 'carApplyStore'
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
                fieldLabel: '申请时间',
                editable: false,
                xtype: 'datefield',
                format: 'Y-m-d',
                bind: {
                    value: '{rec.applyDate}',
                }
            }
            ,
            {
                fieldLabel: '用印数',
                bind: {
                    value: '{rec.usageCount}'
                }
            },
            {
                fieldLabel: '用车类别',
                xtype: 'dictCombobox',
                dictType: 'carType',
                name: 'carType',
                bind: {
                    value: '{rec.carType}'
                }
            }
            ,
            {
                fieldLabel: '经办人',
                bind: {
                    value: '{rec.operator}'
                }
            }
            ,
            {
                fieldLabel: '备注',
                xtype: 'textarea',
                bind: {
                    value: '{rec.remark}'
                }
            }
        ]
    }
    ]
});