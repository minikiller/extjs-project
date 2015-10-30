/**
 * 用户模型
 *
 * @author majian <br/>
 *         date:2015-7-3
 * @version 1.0.0
 */
Ext.define('kalix.workflow.task.model.TaskModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'name', type: 'string'},//名称
        {name: 'description', type: 'string'},//描述
        {name: 'assignee', type: 'string'},//执行人
        {name: '创建时间', type: 'int'},//创建时间
    ]
});