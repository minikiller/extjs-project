/**
 * 应用组件
 *
 * @author majian <br/>
 *         date:2015-7-30
 * @version 1.0.0
 */
Ext.define('kalix.app.application.view.Application', {
    extend: 'Ext.panel.Panel',
    requires: [
        'kalix.app.application.viewModel.ApplicationViewModel',
        'kalix.app.application.controller.ApplicationController'
    ],
    controller: 'applicationController',
    viewModel: {
        type: 'applicationViewModel'
    },
    items: [],
    initComponent: function () {
        var applicationController = this.getController("applicationController");
        this.items[0] = applicationController.onInitPanel();

        this.callParent(arguments);
    }
});