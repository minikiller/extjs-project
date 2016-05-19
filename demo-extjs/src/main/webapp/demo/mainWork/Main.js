/**
 * @author chenyanxu
 */
Ext.define('kalix.demo.mainWork.Main', {
    //extend: 'kalix.container.BaseContainer',
    extend: 'Ext.container.Container',
    requires: [
        'kalix.demo.mainWork.view.dashboard.DashBoardExtend'
    ],
    viewModel: 'mainWorkViewModel',
    //storeId: 'mainWorkStore',
    items: [
        {
            xtype: 'dashboardextend'
        }
    ]
});
