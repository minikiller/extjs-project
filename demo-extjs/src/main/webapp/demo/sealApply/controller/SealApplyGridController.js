/**
 * @author chenyanxu
 */
Ext.define('kalix.demo.sealApply.controller.SealApplyGridController', {
    extend: 'kalix.controller.BaseGridController',
    requires: ['kalix.workflow.components.ActivitiProcessImageWindow'],
    alias: 'controller.sealApplyGridController',
    onWorkFlowStart: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var postUrl;
        if (rec.data.status != "0") {
            Ext.MessageBox.alert(CONFIG.ALTER_TITLE_ERROR, "流程已经启动!");
            return;
        }
        postUrl = CONFIG.restRoot + '/camel/rest/sealapplys/workflow/startProcess?id=' + rec.data.id;
        Ext.Ajax.request({
            url: postUrl,
            method: 'GET',
            callback: function (options, success, response) {
                var resp = Ext.JSON.decode(response.responseText);
                Ext.MessageBox.alert(CONFIG.ALTER_TITLE_INFO, resp.msg);
                if (resp.success) {
                    var store = grid.getStore();
                    store.reload();
                }
            }
        });
    },
    onViewCurrentProcess: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var imgUrl = '/image' + "?processInstanceId=" + rec.data.processInstanceId;
        var win = Ext.create('kalix.workflow.components.ActivitiProcessImageWindow', {
            title: '当前流程 - ' + rec.data.id,
            imgUrl: imgUrl
        });
        win.show();
    }
});