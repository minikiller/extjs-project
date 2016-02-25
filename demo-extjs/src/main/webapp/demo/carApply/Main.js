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
            iconCls: 'x-fa fa-search',
            xtype: 'carApplySearchForm'
        },
        {
            xtype: 'carApplyGrid',
            title: '用车申请列表',
            iconCls: 'x-fa fa-car',
            margin: 10
        }
    ]
});
