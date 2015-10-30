/**
 * 角色组件
 *
 * @author majian <br/>
 *         date:2015-7-10
 * @version 1.0.0
 */
Ext.define('kalix.admin.role.view.Role', {
    extend: 'Ext.panel.Panel',
    requires: [
        'kalix.admin.role.viewModel.RoleViewModel',
        'kalix.admin.role.controller.RoleController'
    ],
    controller: 'roleController',
    viewModel: {
        type: 'roleViewModel'
    },
    items: [],
    initComponent: function () {
        var roleController = this.getController("roleController");

        this.items[0] = roleController.onInitPanel();

        this.callParent(arguments);
    }
});