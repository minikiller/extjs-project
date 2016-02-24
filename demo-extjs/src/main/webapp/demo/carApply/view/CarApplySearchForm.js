/**
 * 审计查询表单
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.demo.carApply.view.CarApplySearchForm', {
    extend: 'kalix.view.components.common.BaseSearchForm',
    alias: 'widget.carApplySearchForm',
    xtype: 'carApplySearchForm',
    storeId: 'carApplyStore',
    items: [
        {
            xtype: 'textfield',
            fieldLabel: '申请部门',
            labelAlign: 'right',
            labelWidth: 60,
            width: 200,
            name: 'department'
        },{
            xtype: 'textfield',
            fieldLabel: '经办人',
            labelAlign: 'right',
            labelWidth: 60,
            width: 200,
            name: 'createBy'
             }]
});
