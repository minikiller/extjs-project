/**
 * 字典查询表单
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.admin.dict.view.DictSearchForm', {
    extend: 'kalix.view.components.common.BaseSearchForm',
    alias: 'widget.dictSearchForm',
    xtype: 'dictSearchForm',
    storeId: 'dictStore',
    items: [
        {
            xtype: 'textfield',
            fieldLabel: '标签名',
            labelAlign: 'right',
            labelWidth: 60,
            width: 200,
            name: 'label'
        }]
});
