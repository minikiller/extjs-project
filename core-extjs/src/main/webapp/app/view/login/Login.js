//app 主窗口容器

Ext.define('kalix.view.login.Login', {
  extend: 'Ext.container.Viewport',

  requires: [
    'kalix.view.login.LoginMain'
  ],

  layout: 'center',

  style: {
    background: '#03558f url(resources/images/login_bg.jpg) right bottom no-repeat'
  },

  items: [
    {
      xtype: 'login'
    }
  ]
});