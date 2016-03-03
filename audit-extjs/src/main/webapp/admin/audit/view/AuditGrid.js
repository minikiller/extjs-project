/**
 * 审计表格
 * @author
 * @version 1.0.0
 */
Ext.define('kalix.admin.audit.view.AuditGrid', {
    extend: 'kalix.view.components.common.BaseGrid',
    requires: [
        'kalix.admin.audit.controller.AuditGridController',
        'kalix.admin.audit.store.AuditStore',
    ],
    alias: 'widget.auditGrid',
    xtype: 'auditGridPanel',
    controller: {
        type: 'auditGridController',
        storeId: 'auditStore',
        cfgViewForm: 'kalix.admin.audit.view.AuditViewWindow',
        cfgModel: 'kalix.admin.audit.model.AuditModel'
    },
    store: {
        type: 'auditStore'
    },
    forceFit : true,
    selModel: {selType: 'checkboxmodel', mode: 'simple'},
    columns: {
        defaults: {flex: 1},
        items: [
            {
                xtype: "rownumberer",
                text: "行号",
                width: 50,
                flex: 0,
                align: 'center',
                renderer: this.update
            },
            {text: '编号', dataIndex: 'id', hidden: true},
            {text: '应用名称', dataIndex: 'appName', renderer: 'addTooltip'},
            {text: '功能名称', dataIndex: 'funName', renderer: 'addTooltip'},
            {text: '操作人', dataIndex: 'actor', renderer: 'addTooltip'},
            {text: '操作', dataIndex: 'action', renderer: 'addTooltip'},
            {text: '操作内容', dataIndex: 'content', flex: 2},
            {
                text: '创建日期',
                dataIndex: 'creationDate'
            },
            {
                xtype: 'securityGridColumnCommon',
                items: [
                    {
                        icon: "resources/images/read.png",
                        permission: 'admin:sysModule:auditMenu:view',
                        tooltip: '查看',
                        handler: 'onView'
                    }, {
                        icon: "resources/images/delete.png",
                        permission: 'admin:sysModule:auditMenu:delete',
                        tooltip: '删除',
                        handler: 'onDelete'
                    }]
            }]
    },
              tbar: {
                  xtype: 'securityToolbar',
                  verifyItems: [
                      {
                          text: '批量删除',
                          xtype: 'button',
                          permission: '',
                          iconCls: 'fa fa-trash',
                          handler: 'onBatchDelete'
                      }
                  ]
              }
});