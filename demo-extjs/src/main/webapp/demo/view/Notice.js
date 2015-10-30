/**
 * 用户组件
 *
 * @author majian <br/>
 *         date:2015-6-18
 * @version 1.0.0
 */
Ext.define('kalix.demo.view.Notice', {
    extend: 'Ext.panel.Panel',
    requires: [
        'kalix.demo.viewModel.NoticeViewModel',
        'kalix.demo.controller.NoticeController'
    ],
    controller: 'noticeController',
    viewModel: {
        type: 'noticeViewModel'
    },
    items: [],
    initComponent: function () {
        var noticeController = this.getController("noticeController");

        this.items[0] = noticeController.onInitPanel();
        /*var grid = Ext.getCmp("noticeDataGrid");
         var store = grid.getStore();
         store.load({params:{start:0, limit:10}});
         grid.getView().refresh();*/
        this.callParent(arguments);
    }
});