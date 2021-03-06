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
            title: '会议室使用申请查询',
            xtype: 'meetingApplySearchForm'
        },
        {
            xtype: 'meetingApplyGrid',
            title: '会议室使用申请列表',
            margin: 10
        }
    ]
});
