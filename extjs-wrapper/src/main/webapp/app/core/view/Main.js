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
        'kalix.core.view.Messagebar',
        'kalix.core.view.Profilebar',
        'kalix.core.view.MainContainerWrap',
        'kalix.core.view.MainTreelist',
        'kalix.admin.dict.store.DictNoPageStore'
    ],

    controller: 'main',
    viewModel: 'main',

    cls: 'sencha-dash-viewport',
    itemId: 'mainView',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    listeners: {
        afterrender: 'afterrender'
    },
    items: [{
        xtype: 'toolbar',
        cls: 'sencha-dash-dash-headerbar toolbar-btn-shadow',
        height: 64,
        itemId: 'headerBar',
        items: [
            {
                xtype: 'component',
                reference: 'senchaLogo',
                cls: 'sencha-logo',
                html: '<div class="main-logo" style="background: url(resources/images/logo_horizontal.png) 0 no-repeat;width: 100%;height: 100%;"></div>',//<img style="margin-left:0px" src="resources/images/logo_horizontal.png"/>
                width: 250
            },
            {
                margin: '0 0 0 8',
                xtype: 'button',
                //cls: 'delete-focus-bg',
                iconCls: 'x-fa fa-navicon',
                id: 'main-navigation-btn',
                handler: 'onToggleNavigationSize'
            },
            {
                xtype: 'maintoolbar'
            },
            {
                xtype: 'tbspacer',
                flex: 1
            },
            {
                xtype: 'messagebar'
            },
            {
                xtype: 'profilebar'
            },
            {
                xtype: 'combo',
                displayField: 'alias',
                valueField: 'name',
                width: 85,
                textAlign: 'center',
                firstLoad: true,
                editable: false,
                store: {
                    data: [
                        {
                            name: 'theme-triton',
                            alias: '浅蓝'
                        },
                        {
                            name: 'theme-aria',
                            alias: '黑色'
                        },
                        {
                            name: 'theme-classic',
                            alias: '经典'
                        },
                        {
                            name: 'theme-gray',
                            alias: '灰色'
                        },
                        {
                            name: 'theme-neptune',
                            alias: '深蓝'
                        },
                        {
                            name: 'theme-crisp',
                            alias: '蓝灰'
                        }
                    ]
                },
                bind: {
                    value: '{theme}'
                },
                listeners: {
                    change: 'onThemeChange'
                }
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
                selectionchange: "onNavigationTreeSelectionChange"
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
