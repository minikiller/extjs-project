Ext.define('kalix.core.view.Profilebar', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'profilebar',

    requires: [
      //'kalix.view.main.ProfilebarController',
      'kalix.core.view.ProfilebarModel'
    ],

    //controller: 'profilebar',
    viewModel: 'profilebar',

    itemId: 'profilebar',
    
    layout: {
        type: 'hbox'
    },
    
    border: false,

    items: [{
      xtype: 'button',
      bind : {
        text : '{user.name}'
      },
      href : '#profile',
      hrefTarget : '_self',
      margin : '0 5 0 10'
    },
    {
      xtype: 'button',
      text : '退出',
      bind : {
        href : '{user.quit}'
      },
      hrefTarget : '_self',
      margin : '0 5 0 10'
    }]
});
