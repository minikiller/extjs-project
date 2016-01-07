/**
 * @author chenyanxu
 */
Ext.define('kalix.demo.sealApply.Main', {
    extend: 'kalix.container.BaseContainer',
    requires: [
        'kalix.demo.sealApply.view.SealApplyGrid',
        'kalix.demo.sealApply.viewModel.SealApplyViewModel'
    ],
    viewModel: 'sealApplyViewModel',
    storeId: 'sealApplyStore',
    items: [
        {
            xtype: 'sealApplyGrid',
            title: '印章使用申请列表',
            //iconCls: 'x-fa fa-calendar',
            margin: 10
        }
    ]
});
