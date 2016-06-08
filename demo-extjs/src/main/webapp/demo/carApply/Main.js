/**
 * @author chenyanxu
 */
Ext.define('kalix.demo.carApply.Main', {
    extend: 'kalix.container.BaseContainer',
    requires: [
        'kalix.demo.carApply.view.CarApplyGrid',
        'kalix.demo.carApply.viewModel.CarApplyViewModel',
        'kalix.demo.carApply.view.CarApplySearchForm'
    ],
    viewModel: 'carApplyViewModel',
    storeId: 'carApplyStore',
    items: [
         {
            title: '用车申请查询',
            xtype: 'carApplySearchForm'
        },
        {
            xtype: 'carApplyGrid',
            title: '用车申请列表',
            margin: 10
        }
    ]
});
