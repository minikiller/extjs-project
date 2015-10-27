/**
 * 用户视图模型
 *
 * @author majian <br/>
 *         date:2015-7-6
 * @version 1.0.0
 */
Ext.define('Kalix.workflow.viewModel.WorkflowViewModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'Kalix.workflow.store.ProcessDefinitionStore',
        'Kalix.workflow.model.ProcessDefinitionModel'
    ],
    alias: 'viewmodel.workflowViewModel',
    data: {
        addTitle: '新增公告',
        editTitle: '编辑公告',
        url: '/kalix/camel/rest/notices',
        processUrl: '/kalix/camel/rest/workflow',
        processShowTitile: '流程定义查看',
        processShowUrl: '/image',
        historyActivityUrl: '/kalix/camel/rest/workflow/activities'

    }
    /*formulas: {
     dirty: {
     bind: {
     bindTo: "{currentNotice}",
     deep: true
     },
     get: function(data) {
     console.log(data);
     return data ? data.dirty : false;
     }
     },
     storeDirty: {
     bind: {
     bindTo: "{currentNotice}",
     deep: true
     },
     get: function() {
     return this.getStore("notices").isDirty();
     }
     }
     },*/
    /*stores: {
     notices: {
     type: 'noticeStore'
     }
     }*/
});