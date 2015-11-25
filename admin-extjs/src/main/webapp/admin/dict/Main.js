/**
 * 用户组件
 *
 * @author majian <br/>
 *         date:2015-6-18
 * @version 1.0.0
 */
Ext.define('kalix.admin.dict.Main', {
    extend: 'Ext.panel.Panel',
    requires: [
        'kalix.admin.dict.viewModel.DictViewModel',
        'kalix.admin.dict.controller.DictController'
    ],
    controller: 'dictController',
    viewModel: {
        type: 'dictViewModel'
    },
    items: [],
    initComponent: function () {
        var dictController = this.getController("dictController");

        this.items[0] = dictController.onInitPanel();

        this.callParent(arguments);
    }
});
