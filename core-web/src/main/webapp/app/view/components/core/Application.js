/**
 * 应用组件
 *
 * @author majian <br/>
 *         date:2015-6-18
 * @version 1.0.0
 */
Ext.define('Kalix.view.components.core.Application', {
    extend: 'Ext.TabPanel',
    requires: [
        'Kalix.controller.components.core.ApplicationController',
        'Kalix.view.main.MainModel'
    ],
    alias: 'widget.applicationComponent',
    controller: 'applicationComponentController',
    viewModel: 'main',
    autoWidth: true,
    autoHeight: true,
    id: "application",
    plain: true,
    frame: false,
    broder: false,
    listeners: {
        tabchange: 'onTabchange',
        render: 'onRender'
    },
    initComponent: function () {
        this.callParent(arguments);
    }
});