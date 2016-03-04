/**
 * 流程历史表格控制器
 *
 * @author majian <br/>
 *         date:2015-6-18
 * @version 1.0.0
 */
Ext.define('kalix.workflow.processhistory.controller.ProcessHistoryGridController', {
    extend: 'kalix.controller.BaseGridController',
    alias: 'controller.processHistoryGridController',
    requires: [
        'kalix.workflow.approve.view.ApproveWindow'
    ],
    onOpenHistoryActivity: function (grid, rowIndex, colIndex) {
            var rec = grid.getStore().getAt(rowIndex);
            var businessKey=rec.data.businessKey;
            var key=businessKey.split(':');
            var bizUrl=key[0];//获得bizkey的头 例如：carapply
            Ext.Ajax.request({
                url: CONFIG.restRoot + '/camel/rest/'+bizUrl+'s/' + rec.data.entityId,
                method: 'GET',
                callback: function (options, success, response) {
                    var entity = Ext.JSON.decode(response.responseText);
                    if (entity == null) {
                        Ext.Msg.alert(CONFIG.ALTER_TITLE_FAILURE, '实体不能为空.');
                        return;
                    }
                    Ext.Ajax.request({
                        url: CONFIG.restRoot + '/camel/rest/workflow/bizData?processDefinitionId=' + rec.data.processDefinitionId,
                        method: 'GET',
                        callback: function (options, success, response) {
                            var component = Ext.JSON.decode(response.responseText);
                            var approvalWindow = Ext.create('kalix.workflow.approve.view.ApproveWindow');
                            var vm = approvalWindow.lookupViewModel();

                            vm.set('title', '流程历史查看');
                            vm.set('rec', entity);
                            vm.set('view_operation', true);

                            approvalWindow.insert(0, Ext.create(component.componentClass, {
                                layout: {
                                    type: 'table',
                                    columns: 6
                                }
                            }));

                            approvalWindow.show();
                            approvalWindow.items.getAt(1).items.getAt(0).getStore().getProxy().extraParams = {historyProcessId: rec.data.processInstanceId};
                            approvalWindow.items.getAt(1).items.getAt(0).getStore().load();
                        }
                    });
                }
            });

        }
});