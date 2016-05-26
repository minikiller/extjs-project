/**
 * 流程分类查看表单
 *
 * @author
 * @version 1.0.0
 */

Ext.define('kalix.workflow.category.view.CategoryViewWindow', {
    extend: 'kalix.view.components.common.BaseWindow',
        requires: [
            'kalix.workflow.category.viewModel.CategoryViewModel',
            'kalix.admin.user.store.UserStore'
        ],
        alias: 'widget.categoryViewWindow',
        viewModel: 'categoryViewModel',
        xtype: "categoryViewWindow",
        width: 400,
    //todo 在此修改查看字段
    items: [{
            defaults: {readOnly: true},
            xtype: 'baseForm',
            items: [
                	{
                		fieldLabel: '分类名称',
                		allowBlank: false,
                		bind: {
                			value: '{rec.name}'
                		}
                	},
                	{
                		fieldLabel: '分类主键',
                		allowBlank: false,
                		bind: {
                			value: '{rec.key}'
                		}
                	},
                	{
                		fieldLabel: '分类图标',
                		allowBlank: false,
                		bind: {
                			value: '{rec.icon}'
                		}
                	},
                	{
                		fieldLabel: '分类描述',
						xtype: 'textarea',
                		bind: {
                			value: '{rec.description}'
                		}
                	}
            ]
            }

        ]


});