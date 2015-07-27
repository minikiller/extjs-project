/**
 * 顶部面板
 *
 * @author majian <br/>
 *         date:2015-6-18
 * @version 1.0.0
 */
Ext.define('Kalix.view.main.region.Top', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Kalix.view.components.core.Theme',
        'Kalix.view.main.MainModel'
    ],

    uses: ['Kalix.view.components.core.Application'],

    alias: 'widget.maintop',

    viewModel: {
        type: 'main'
    },


    height: 60,

    border: false,

    id: 'maintop',

    initComponent: function () {
        var user = Ext.create("Ext.form.Label", {
            id: 'user'
        });
        this.items[0] = {
            xtype: 'panel',
            layout: 'column',
            bind: {
                bodyStyle: "background-image:url('{system.background}')"
            },
            height: 60,
            items: [
                {
                    xtype: 'image',
                    columnWidth: .15,
                    bind: {
                        hidden: '{!system.icon}',
                        src: '{system.icon}'
                    }
                }, {
                    xtype: 'panel',
                    columnWidth: .85,
                    bind: {
                        bodyStyle: "background-image:url('{system.background}')"
                    },
                    id: 'topMenuPanel',
                    border: false,
                    items: [{
                        xtype: 'panel',
                        labelAlign: 'center',
                        bind: {
                            bodyStyle: "background-image:url('{system.background}')"
                        },
                        height: 25,
                        border: false,
                        layout: 'column',
                        items: [{
                            xtype: 'label',
                            html: '&nbsp;&nbsp;',
                            columnWidth: .95
                        }, {
                            xtype: 'label',
                            html: '&nbsp;&nbsp;欢迎您,'
                        }, user, {
                            xtype: 'label',
                            bind: {
                                html: "&nbsp;&nbsp;<a href='{user.quit}'>[退出]</a>"
                            }
                        }, {
                            xtype: 'label',
                            html: '&nbsp;&nbsp;'
                        }, {
                            xtype: 'themeComponent'
                        }]
                    }, {
                        xtype: 'applicationComponent'
                    }]
                }]
        };


        var currentUserName = Ext.util.Cookies.get('currentUserName');
        if (currentUserName != null) {
            user.setText(currentUserName);
        }
        //初始化用户
        //Ext.Ajax.request({
        //    url: this.getViewModel().get("user.url"),
        //    method: "GET",
        //    callback: function (options, success, response) {
        //        var _user = Ext.JSON.decode(response.responseText);
        //        if (_user) {
        //            user.setText(eval("_user.name"));
        //        }
        //    }
        //});

        this.callParent(arguments);
    },

    items: []
});