/**
 * 流程历史组件
 *
 * @author majian <br/>
 *         date:2015-6-18
 * @version 1.0.0
 */
Ext.define('kalix.workflow.myprocesshistory.Main', {
    extend: 'kalix.container.BaseContainer',
    requires: [
        'kalix.workflow.myprocesshistory.view.MyProcessHistorySearchForm',
        'kalix.workflow.myprocesshistory.view.MyProcessHistoryGrid',
        'kalix.workflow.myprocesshistory.viewModel.ProcessHistoryViewModel'
    ],
    storeId: 'myProcessHistoryStore',
    viewModel: 'processHistoryViewModel',
    items: [{
        xtype: 'myProcessHistorySearchForm',
        title: '我的流程查询',
        iconCls: 'x-fa fa-search'
    }, {
        xtype: 'myProcessHistoryGrid',
        title: '我的流程列表',
        iconCls: 'x-fa fa-history',
        margin: 10
    }]
});