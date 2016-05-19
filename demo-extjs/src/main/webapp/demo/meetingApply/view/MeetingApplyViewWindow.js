/**
 * @author zangyanming
 */

Ext.define('kalix.demo.meetingApply.view.MeetingApplyViewWindow', {
    extend: 'kalix.view.components.common.BaseWindow',
    requires: [
        'kalix.demo.meetingApply.view.MeetingApplyViewForm',
        'kalix.demo.meetingApply.viewModel.MeetingApplyViewModel'
    ],
    alias: 'widget.meetingApplyViewWindow',
    xtype: "meetingApplyViewWindow",
    viewModel: 'meetingApplyViewModel',
    width: 840,
    items: [
        {
            xtype: 'meetingApplyViewForm',
            layout: {
                type: 'table',
                columns: 6
            }
        }
    ]
});