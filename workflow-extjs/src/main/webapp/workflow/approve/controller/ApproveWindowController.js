/**
 * @author chenyanxu
 */
Ext.define('kalix.workflow.approve.controller.ApproveWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.approveWindowController',
    requires: ['kalix.core.Notify'],
    onApprove: function (btn) {
        var scope = this;
        var status, approveOpinion, businessKey, taskId;

        status = btn.text;
        approveOpinion = this.getViewModel().get('approveOpinion');
        businessKey = this.getViewModel().get('businessKey');
        taskId = this.getViewModel().get('taskId');

        Ext.Ajax.request({
            url: CONFIG.restRoot + '/camel/rest/' + businessKey + 's/workflow/completeTask?taskId=' + taskId + "&accepted=" + status + "&comment=" + approveOpinion,
            method: "GET",
            callback: function (options, success, response) {
                var jsonStatus = Ext.JSON.decode(response.responseText);
                if (jsonStatus.success) {
                    kalix.core.Notify.success(jsonStatus.msg, CONFIG.ALTER_TITLE_SUCCESS);
                    Ext.app.Application.instance.getApplication().getStore('taskStore').reload();
                    scope.getView().close();
                }
                else {
                    Ext.MessageBox.alert(CONFIG.ALTER_TITLE_FAILURE, jsonStatus.msg);
                }
            }
        });
    }
});
