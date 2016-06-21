/**
 * @author chenyanxu
 */

Ext.define('kalix.demo.recruitApply.view.RecruitApplyViewWindow', {
    extend: 'kalix.view.components.common.BaseWindow',
    requires: [
        'kalix.demo.recruitApply.view.RecruitApplyViewForm',
        'kalix.demo.recruitApply.viewModel.RecruitApplyViewModel'
    ],
    alias: 'widget.recruitApplyViewWindow',
    xtype: "recruitApplyViewWindow",
    viewModel: 'recruitApplyViewModel',
    width: 840,
    items: [
        {
            xtype: 'recruitApplyViewForm',
            layout: {
                type: 'table',
                columns: 6
            }
        }
    ]
});