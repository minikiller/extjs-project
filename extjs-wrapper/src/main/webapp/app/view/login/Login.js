//app 主窗口容器

Ext.define('kalix.view.login.Login', {
    extend: 'Ext.container.Viewport',
    requires: [
        'kalix.view.login.LoginController',
        'kalix.view.login.LoginMain',
        'kalix.view.login.LoginViewModel'
    ],
    layout: 'center',
    controller: 'login',
    viewModel: 'loginViewModel',
    style: {
        background: '#03558f url(resources/images/login_bg.jpg) right bottom no-repeat'
    },
    items: [
        {
            xtype: 'container',
            width: 380,
            defaults: {
                margin: '0 0 30 0',
                width: 380
            },
            items: [
                {
                    xtype: 'image',
                    src: 'resources/images/login_top.png'
                },
                {
                    xtype: 'textfield',
                    height: 50,
                    fieldStyle: 'font-size:15px;height:50px;',
                    emptyText: '账号',
                    margin: '0 0 10 0',
                    bind: {
                        value: '{username}'
                    }
                },
                {
                    xtype: 'textfield',
                    inputType: 'password',
                    fieldStyle: 'font-size:15px;height:50px;',
                    emptyText: '密码',
                    height: 50,
                    bind: {
                        value: '{password}'
                    }
                },
                {
                    xtype: 'button',
                    style: {
                        background: 'url(resources/images/login_btn.png) right bottom no-repeat'
                    },
                    height: 50,
                    border: false,
                    handler: 'onLogin'
                },
                {
                    xtype: 'image',
                    src: 'resources/images/login_bottom.png'
                },
                {
                    xtype: 'login',
                    hidden: true
                }
            ]
        }
    ]
});