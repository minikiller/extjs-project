/**
 * @author zangyanming
 */
Ext.define('kalix.demo.meetingApply.Main', {
    extend: 'kalix.container.BaseContainer',
    requires: [
        'kalix.demo.meetingApply.view.MeetingApplyGrid',
        'kalix.demo.meetingApply.viewModel.MeetingApplyViewModel',
        'kalix.demo.meetingApply.view.MeetingApplySearchForm'
    ],
    viewModel: 'meetingApplyViewModel',
    storeId: 'meetingApplyStore',
    items: [
         {
            title: '用车申请查询',
            iconCls: 'x-fa fa-search',
            xtype: 'meetingApplySearchForm'
        },
        {
            xtype: 'meetingApplyGrid',
            title: '用车申请列表',
            iconCls: 'x-fa fa-car',
            margin: 10
        }
    ]
});
