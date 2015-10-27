/**
 * 主应用入口
 *
 * date:2015-10-26
 */
Ext.define('kalix.core.view.Main', {
    extend: 'Ext.container.Viewport',

    requires: [
        'kalix.core.controller.MainController',
        'kalix.core.view.MainModel',
        'kalix.core.view.MainToolbar',
        'kalix.core.view.Profilebar',
        'kalix.core.view.MainContainerWrap',
        'kalix.core.view.MainTreelist'
    ],

    controller: 'main',
    viewModel: 'main',

    cls: 'sencha-dash-viewport',
    itemId: 'mainView',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [{
        xtype: 'toolbar',
        cls: 'sencha-dash-dash-headerbar toolbar-btn-shadow',
        height: 64,
        itemId: 'headerBar',
        items: [{
            xtype: 'component',
            reference: 'senchaLogo',
            cls: 'sencha-logo',
            html: '<div class="main-logo"></div>',
            width: 250
        }, {
            margin: '0 0 0 8',
            cls: 'delete-focus-bg',
            iconCls: 'x-fa fa-navicon',
            id: 'main-navigation-btn',
            handler: 'onToggleNavigationSize'
        }, {
            xtype: 'maintoolbar'
        }, {
            xtype: 'tbspacer',
            flex: 1
        }, {
            xtype: 'profilebar'
        }
        ]
    }, {
        xtype: 'maincontainerwrap',
        id: 'main-view-detail-wrap',
        reference: 'mainContainerWrap',
        flex: 1,
        items: [{
            xtype: "maintreelist",
            reference: "navigationTreeList",
            itemId: "navigationTreeList",
            ui: "navigation",
            store: "NavigationTree",
            width: 250,
            expanderFirst: false,
            expanderOnly: false,
            listeners: {
                selectionchange: "onNavigationTreeSelectionChange",
                beforeRender: function () {
                    console.log('before render tree list')
            }
            }
        }, {
            xtype: "container",
            flex: 1,
            reference: "mainCardPanel",
            cls: "sencha-dash-right-main-container",
            itemId: "contentPanel",
            layout: {
                type: "card",
                anchor: "100%"
            }
        }
        ]
    }
    ]
});
