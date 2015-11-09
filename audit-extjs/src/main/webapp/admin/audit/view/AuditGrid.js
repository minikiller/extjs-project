/**
 * 用户表格
 * @author majian
 *         date:2015-7-3
 * @version 1.0.0
 */
Ext.define('kalix.admin.audit.view.AuditGrid', {
    extend: 'Ext.grid.Panel',
    requires: [
        'kalix.admin.audit.viewModel.AuditViewModel',
        'kalix.admin.audit.controller.AuditGridController'
    ],
    alias: 'widget.auditGrid',
    xtype: 'auditGrid',
    controller: 'auditGridController',
    viewModel: {
        type: 'auditViewModel'
    },
    autoLoad: true,
    stripeRows: true,
    manageHeight: true,
    selModel: {selType: 'checkboxmodel', mode: "SIMPLE"},
    columns: [
        {text: '编号', dataIndex: 'id', width: 40},
        {text: '应用名称', dataIndex: 'appName', width: 80},
        {text: '功能名称', dataIndex: 'funName', width: 80},
        {text: '操作人', dataIndex: 'actor', width: 80},
        {text: '操作', dataIndex: 'action', width: 80},
        {text: '操作内容', dataIndex: 'content', width: 450},
        {
            text: '创建日期', dataIndex: 'creationDate', width: 120, renderer: function (value) {
            var createDate = new Date(value);
            return createDate.format("yyyy-MM-dd hh:mm:ss");
        }
        },
        {
            header: '操作',
            xtype: "actioncolumn",
            width: 60,
            items: [/*{
             icon: "resources/images/pencil.png",
             tooltip: '修改',
             handler: 'onEdit'
             }, */{
                icon: "admin/resources/images/cancel.png",
                tooltip: '删除',
                handler: 'onDelete'

            }]
        }
    ],
    /*tbar: [
     {
     text: '新增', icon: 'admin/resources/images/group_add.png', handler: 'onAdd'
     }, "-",
     {
     text: '批量删除', icon: 'admin/resources/images/group_delete.png', handler: 'onDeleteAll'
     }, "-"],*/

});