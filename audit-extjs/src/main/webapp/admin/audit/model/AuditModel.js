/**
 * 用户模型
 *
 * @author majian
 *         date:2015-7-3
 * @version 1.0.0
 */
Ext.define('kalix.admin.audit.model.AuditModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'appName', type: 'string'},//应用名称
        {name: 'funName', type: 'string'},//功能名称
        {name: 'actor', type: 'string'},//操作人
        {name: 'action', type: 'string'},//操作
        {name: 'content', type: 'string'},//操作内容
        {name: 'creationDate', type: 'int'},//创建日期
    ]
});