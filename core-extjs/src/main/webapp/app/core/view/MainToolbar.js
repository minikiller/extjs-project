Ext.define('kalix.core.view.MainToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'maintoolbar',

    requires: [
        'kalix.core.controller.MainToolbarController',
        'kalix.core.view.MainToolbarModel'
    ],

    controller: 'maintoolbar',
    viewModel: 'maintoolbar',

    id: 'mainToolbar',

    bind: {
        items: '{items}'
    },

    border: false,

    setItems: function (items) {
        var toolbar = this;
        toolbar.removeAll()
        items.forEach(function (item, index) {
            toolbar.add(Ext.create('Ext.button.Button', {
                id: item.id,
                href: '#' + item.id,
                text: item.title,
                icon: item.icon,
                hrefTarget: '_self',
                border: 0,
                margin: '0 5 0 10'
            }));
        });
    }
});
