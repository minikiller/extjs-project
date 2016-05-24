/**model of contract
 *  @author zangyanming
 *
 */
Ext.define('kalix.demo.meetingApply.model.MeetingApplyModel', {
    extend: 'kalix.model.WorkflowBaseModel',
    fields: [
        {name: 'department'},//申请部门
        {name: 'meetingPlace'},//会议地点
        {name: 'meetingTopic'},//会议名称
        {name: 'requirement', type: 'int'},//宣传需求（企划中心）
        {name: 'host'},//主持人
        {name: 'meetingDate', type: 'date', dateFormat: 'Y-m-d H:i:s'},//会议申请时间
        {name: 'weekOfDate'}, //星期几
        {name: 'beginTime', type: 'date', dateFormat: 'Y-m-d H:i:s'}, //会议时段,开始时间
        {name: 'endTime', type: 'date', dateFormat: 'Y-m-d H:i:s'}, //会议时段，结束时间
        {name: 'participant'},//参会人员
        {name: 'attendance', type: 'int'},//出席人数
        {name: 'equipmentRequirement'}, //设备要求
        {name: 'securityPerson'}, //联系人（安全责任人）
        {name: 'schoolUser'} //联系人电话
    ]
});
