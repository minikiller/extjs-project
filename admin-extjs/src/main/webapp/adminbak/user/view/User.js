/**
 * 用户组件
 *
 * @author majian <br/>
 *         date:2015-6-18
 * @version 1.0.0
 */
Ext.define('kalix.admin.user.view.User', {
    extend: 'Ext.panel.Panel',
    requires: [
        'kalix.admin.user.viewModel.UserViewModel',
        'kalix.admin.user.controller.UserController'
    ],
    controller: 'userController',
    viewModel: {
        type: 'userViewModel'
    },
    items: [],
    initComponent: function () {
        var userController = this.getController("userController");
        this.items[0] = userController.onInitPanel();

        this.callParent(arguments);
    }
});