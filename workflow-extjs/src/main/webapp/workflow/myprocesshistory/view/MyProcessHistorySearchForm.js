/**
 * 流程历史查询表单
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.workflow.myprocesshistory.view.MyProcessHistorySearchForm', {
    extend: 'kalix.view.components.common.BaseSearchForm',
    alias: 'widget.myProcessHistorySearchForm',
    xtype: 'myProcessHistorySearchForm',
    storeId: 'myProcessHistoryStore',
    items: [
        {
            xtype: 'textfield',
            fieldLabel: '业务主键',
            labelAlign: 'right',
            labelWidth: 60,
            width: 200,
            name: 'name'
        }
    ]
});
