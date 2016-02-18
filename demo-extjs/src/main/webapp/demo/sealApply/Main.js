/**
 * @author chenyanxu
 */
Ext.define('kalix.demo.sealApply.Main', {
    extend: 'kalix.container.BaseContainer',
    requires: [
        'kalix.demo.sealApply.view.SealApplyGrid',
        'kalix.demo.sealApply.viewModel.SealApplyViewModel',
        'kalix.demo.sealApply.view.SealApplySearchForm'
    ],
    viewModel: 'sealApplyViewModel',
    storeId: 'sealApplyStore',
    items: [
         {
            title: '印章申请查询',
            iconCls: 'x-fa fa-search',
            xtype: 'sealApplySearchForm'
        },
        {
            xtype: 'sealApplyGrid',
            title: '印章申请列表',
            iconCls: 'x-fa fa-credit-card',
            margin: 10
        }
    ]
});
