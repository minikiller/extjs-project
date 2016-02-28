/**
 * @author chenyanxu
 */

Ext.define('kalix.demo.carApply.view.CarApplyViewWindow', {
    extend: 'kalix.view.components.common.BaseWindow',
    requires: [
        'kalix.demo.carApply.view.CarApplyViewForm',
        'kalix.demo.carApply.viewModel.CarApplyViewModel'
    ],
    alias: 'widget.carApplyViewWindow',
    xtype: "carApplyViewWindow",
    viewModel: 'carApplyViewModel',
    width: 840,
    items: [
        {
            xtype: 'carApplyViewForm',
            layout: {
                type: 'table',
                columns: 6
            }
        }
    ]
});