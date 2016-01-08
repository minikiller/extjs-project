/**
 * @author chenyanxu
 */

Ext.define('kalix.demo.sealApply.view.SealApplyWindow', {
    extend: 'kalix.view.components.common.BaseWindow',
    requires: [
        'kalix.controller.BaseWindowController',
        'kalix.demo.sealApply.viewModel.SealApplyViewModel',
        'kalix.admin.dict.component.DictCombobox'
    ],
    alias: 'widget.sealApplyWindow',
    xtype: "sealApplyWindow",
    viewModel: 'sealApplyViewModel',
    width: 400,
    controller: {
        type: 'baseWindowController',
        storeId: 'sealApplyStore'
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
                fieldLabel: '印章类别',
                xtype: 'dictCombobox',
                dictType: 'sealType',
                name: 'sealType',
                bind: {
                    value: '{rec.sealType}'
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