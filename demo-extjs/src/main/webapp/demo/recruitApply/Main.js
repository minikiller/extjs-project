/**
 * @author chenyanxu
 */
Ext.define('kalix.demo.recruitApply.Main', {
    extend: 'kalix.container.BaseContainer',
    requires: [
        'kalix.demo.recruitApply.view.RecruitApplyGrid',
        'kalix.demo.recruitApply.viewModel.RecruitApplyViewModel',
        'kalix.demo.recruitApply.view.RecruitApplySearchForm'
    ],
    viewModel: 'recruitApplyViewModel',
    storeId: 'recruitApplyStore',
    items: [
         {
            title: '用工招聘申请查询',
            xtype: 'recruitApplySearchForm'
        },
        {
            xtype: 'recruitApplyGrid',
            title: '用工招聘申请列表',
            margin: 10
        }
    ]
});
