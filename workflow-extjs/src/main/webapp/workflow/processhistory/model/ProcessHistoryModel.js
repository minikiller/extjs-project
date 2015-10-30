/**
 * 用户模型
 *
 * @author majian <br/>
 *         date:2015-7-3
 * @version 1.0.0
 */
Ext.define('kalix.workflow.processhistory.model.ProcessHistoryModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'processDefinitionId', type: 'string'},//流程id
        {name: 'startUserId', type: 'string'},//启动用户id
        {name: 'startTime', type: 'string'},//开始时间
        {name: 'endTime', type: 'string'},//结束时间
        {name: 'businessKey', type: 'string'},//业务主键
        {name: 'status', type: 'string'},//当前状态
    ]
});