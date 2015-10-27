//todo 定义系统应用页面

Ext.define('kalix.AdminApplication.Main', {
    extend: 'Ext.container.Container',

    requires: [
      'Ext.ux.layout.ResponsiveColumn'
    ],

    //controller: 'application',
    //viewModel: {
    //    type: 'dashboard'
    //},

    layout: 'responsivecolumn',
    
    //listeners: {
    //    hide: 'onHideView'
    //},

    items: [
      {
        xtype: 'container',
        html : '系统首页'
      }
      /*    
      {
            xtype: 'dashboardnetworkpanel',

            // 60% width when viewport is big enough,
            // 100% when viewport is small
            responsiveCls: 'big-60 small-100'
        },
        {
            xtype: 'dashboardhddusagepanel',
            responsiveCls: 'big-20 small-50'
        },
        {
            xtype: 'dashboardearningspanel',
            responsiveCls: 'big-20 small-50'
        },
        {
            xtype: 'dashboardsalespanel',
            responsiveCls: 'big-20 small-50'
        },
        {
            xtype: 'dashboardtopmoviepanel',
            responsiveCls: 'big-20 small-50'
        },
        {
            xtype: 'dashboardweatherpanel',
            responsiveCls: 'big-40 small-100'
        },
        {
            xtype: 'dashboardtodospanel',
            responsiveCls: 'big-60 small-100'
        },
        {
            xtype: 'dashboardservicespanel',
            responsiveCls: 'big-40 small-100'
        }
        */
    ]
});
