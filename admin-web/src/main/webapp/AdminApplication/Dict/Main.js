/**
 * 字典组件
 *
 * @author majian <br/>
 *         date:2015-7-9
 * @version 1.0.0
 */
Ext.define('kalix.AdminApplication.Dict.Main', {
    extend: 'Ext.panel.Panel',
    requires: [
        'kalix.AdminApplication.Dict.view.DictViewModel',
        'kalix.AdminApplication.Dict.controller.DictController'
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