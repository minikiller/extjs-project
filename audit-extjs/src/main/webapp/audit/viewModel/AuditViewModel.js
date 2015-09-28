/**
 * 用户视图模型
 *
 * @author majian
 *         date:2015-7-6
 * @version 1.0.0
 */
Ext.define('Kalix.audit.viewModel.AuditViewModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'Kalix.audit.store.AuditStore',
        'Kalix.audit.model.AuditModel'
    ],
    alias: 'viewmodel.auditViewModel',
    data: {
        addTitle: '新增公告',
        editTitle: '编辑公告',
        url: '/kalix/camel/rest/audits',
    },
    /*formulas: {
     dirty: {
     bind: {
     bindTo: "{currentAudit}",
     deep: true
     },
     get: function(data) {
     console.log(data);
     return data ? data.dirty : false;
     }
     },
     storeDirty: {
     bind: {
     bindTo: "{currentAudit}",
     deep: true
     },
     get: function() {
     return this.getStore("audits").isDirty();
     }
     }
     },*/
    /*stores: {
     audits: {
     type: 'auditStore'
     }
     }*/
});