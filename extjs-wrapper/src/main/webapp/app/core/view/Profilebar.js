Ext.define('kalix.core.view.Profilebar', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'profilebar',

    requires: [
        'kalix.core.view.ProfilebarModel'
    ],

    viewModel: 'profilebar',

    itemId: 'profilebar',

    layout: {
        type: 'hbox'
    },

    border: false,

    items: [{
        xtype: 'button',
        bind: {
            text: '{user.name}'
        },
        iconCls:'iconfont icon-user',
        href: '#profile',
        hrefTarget: '_self',
        margin: '0 5 0 10'
    }, {
        xtype: 'button',
        text: '退出',
        iconCls:'iconfont icon-exit',
        bind: {
            href: '{user.quit}'
        },
        hrefTarget: '_self',
        margin: '0 5 0 10'
    }
    ]
});
