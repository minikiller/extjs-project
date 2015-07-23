/**
 * 部门组件
 *
 * @author majian <br/>
 *         date:2015-7-21
 * @version 1.0.0
 */
Ext.define('Kalix.admin.dep.view.Dep', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Kalix.admin.dep.viewModel.DepViewModel',
        'Kalix.admin.dep.controller.DepController'
    ],
    controller: 'depController',
    viewModel: {
        type: 'depViewModel'
    },
    items: [],
    initComponent: function () {
        var depController = this.getController("depController");

        this.items[0] = depController.onInitPanel();

        this.callParent(arguments);
    }
});