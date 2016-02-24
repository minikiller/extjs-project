Ext.define('kalix.core.view.Messagebar', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'messagebar',

    requires: [
        'kalix.core.view.MessagebarModel'
    ],

    viewModel: 'messagebarViewModel',

    id: 'messagebarId',

    layout: {
        type: 'hbox'
    },

    border: false,

    items: [{
        xtype: 'button',
        bind: {
            text: '{message.count}',
            iconCls: '{message.iconCls}'
        },
        href: '#workflow/message',
        hrefTarget: '_self',
        margin: '0 5 0 10'
    }
    ]
});
