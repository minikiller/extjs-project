/**
 * 组织机构图展示
 *
 * @author chenyanxu
 * @version 1.0.0
 */
Ext.define('kalix.admin.orgchart.Main', {
  extend: 'Ext.panel.Panel',
  requires: [
    'kalix.orgchart.view.OrgChartWrap'
  ],
  xtype: 'orgchartPanel',
  layout: {
    type: 'fit'
  },
  items: [
    {
      xtype: 'orgChartWrap'
    }
  ]
});