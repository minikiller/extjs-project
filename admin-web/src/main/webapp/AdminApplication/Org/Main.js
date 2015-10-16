/**
 * 机构组件
 *
 * @author majian <br/>
 *         date:2015-7-21
 * @version 1.0.0
 */
Ext.define('kalix.AdminApplication.Org.Main', {
    extend: 'Ext.panel.Panel',
    requires: [
        'kalix.AdminApplication.Org.view.OrgViewModel',
        'kalix.AdminApplication.Org.controller.OrgController'
    ],
    controller: 'orgController',
    xtype: 'orgPanel',
    viewModel: {
        type: 'orgViewModel'
    },
    items: [],
    initComponent: function () {
        var OrgController = this.getController("orgController");

        this.items[0] = OrgController.onInitPanel();

        this.callParent(arguments);
    }
});