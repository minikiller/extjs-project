/**
 * @author chenyanxu
 */

Ext.define('kalix.demo.sealApply.view.SealApplyViewWindow', {
    extend: 'kalix.view.components.common.BaseWindow',
    requires: [
        'kalix.demo.sealApply.view.SealApplyViewForm',
        'kalix.demo.sealApply.viewModel.SealApplyViewModel'
    ],
    alias: 'widget.sealApplyViewWindow',
    xtype: "sealApplyViewWindow",
    viewModel: 'sealApplyViewModel',
    width: 840,
    items: [
        {
            xtype: 'sealApplyViewForm',
            layout: {
                type: 'table',
                columns: 6
            }
        }
    ]
});