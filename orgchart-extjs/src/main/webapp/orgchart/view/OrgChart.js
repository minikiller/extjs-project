Ext.define('kalix.orgchart.view.OrgChart', {
  extend: 'Ext.container.Container',
  requires: [
    'kalix.orgchart.lib.JitLib',
    'kalix.orgchart.controller.OrgChartController'
  ],
  controller: 'orgChartController',
  layout: 'absolute',
  xtype: 'orgChart',
  //--[org chart extend begin]
  orgTree: null,
  autoLoad: false,
  jsonData: null,
  //--[org chart extend end]
  listeners: {
    afterrender: 'orgChartAfterRender'
  },
  items: [
    {
      xtype: 'container',
      listeners: {
        afterrender: 'orgChartContainerAfterRender'
      }
    },
    {
      xtype: 'image',
      src: 'orgchart/resources/images/arrow_blue_up.png',
      x: 50,
      y: 10,
      alt: 'bottom',
      style: 'cursor:pointer',
      listeners: {
        afterrender: 'imageAfterRender'
      }
    },
    {
      xtype: 'image',
      src: 'orgchart/resources/images/arrow_blue_right.png',
      x: 82,
      y: 45,
      alt: 'left',
      style: 'cursor:pointer',
      listeners: {
        afterrender: 'imageAfterRender'
      }
    },
    {
      xtype: 'image',
      src: 'orgchart/resources/images/arrow_blue_down.png',
      x: 50,
      y: 80,
      alt: 'top',
      style: 'cursor:pointer',
      listeners: {
        afterrender: 'imageAfterRender'
      }
    },
    {
      xtype: 'image',
      src: 'orgchart/resources/images/arrow_blue_left.png',
      x: 18,
      y: 45,
      alt: 'right',
      style: 'cursor:pointer',
      listeners: {
        afterrender: 'imageAfterRender'
      }
    }
  ]
});
