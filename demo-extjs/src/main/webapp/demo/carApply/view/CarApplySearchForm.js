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
    }, {
      xtype: 'textfield',
      fieldLabel: '经办人',
      labelAlign: 'right',
      labelWidth: 60,
      width: 200,
      name: 'createBy'
    },
    {
      xtype:'imageToolTip',
      tooltip:"<p style='color:blue;font-weight:bold;'>Follow the below instruction to enter valid username</p><dl><dt><b style='color:red;'>Lenght:</b></dt><dd>- Minimum: 4 char</dd><dd>- Maximun: 12 char</dd><dt><b style='color:red;'>Character:</b></dt><dd>- Atleast one numeric char</dd><dd>- Special char not allowed</dd>"
    }
  ]
});
