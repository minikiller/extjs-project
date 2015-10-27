/**
 * 字典组件
 *
 * @author majian <br/>
 *         date:2015-7-9
 * @version 1.0.0
 */
Ext.define('Kalix.admin.dict.view.Dict', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Kalix.admin.dict.viewModel.DictViewModel',
        'Kalix.admin.dict.controller.DictController'
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