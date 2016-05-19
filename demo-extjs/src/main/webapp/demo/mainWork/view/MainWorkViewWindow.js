/**
 * @author chenyanxu
 */

Ext.define('kalix.demo.mainWork.view.MainWorkViewWindow', {
    extend: 'kalix.view.components.common.BaseWindow',
    requires: [
        'kalix.demo.mainWork.view.MainWorkViewForm',
        'kalix.demo.mainWork.viewModel.MainWorkViewModel'
    ],
    alias: 'widget.mainWorkViewWindow',
    xtype: "mainWorkViewWindow",
    viewModel: 'mainWorkViewModel',
    width: 840,
    items: [
        {
            xtype: 'mainWorkViewForm',
            layout: {
                type: 'table',
                columns: 6
            }
        }
    ]
});