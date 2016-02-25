/**
 * 代办任务控制器
 *
 * @author majian <br/>
 *         date:2015-6-18
 * @version 1.0.0
 */
Ext.define('kalix.workflow.task.controller.TaskGridController', {
        extend: 'kalix.controller.BaseGridController',
        alias: 'controller.taskGridController',
        /**
         * 查看当前环节
         * @param grid
         * @param rowIndex
         * @param colIndex
         */
        onOpenCurrentProcess: function (grid, rowIndex, colIndex) {
            var rec = grid.getStore().getAt(rowIndex);
            var imgUrl = this.getView().getViewModel().get('processShowUrl') + '?taskId=' + rec.data.id;
            var win = Ext.create('kalix.workflow.components.ActivitiProcessImageWindow', {
                title: '流程查看 - ' + rec.data.name,
                imgUrl: imgUrl
            });
            win.show();
        },
        /**
         * 处理任务项
         * @param grid
         * @param rowIndex
         * @param colIndex
         */
        onCompleteTask: function (grid, rowIndex, colIndex) {
            var rec = grid.getStore().getAt(rowIndex);
            var businessKey=rec.data.businessKey;
            var key=businessKey.split(':');
            var bizUrl=key[0];//获得bizkey的头 例如：carapply
            Ext.Ajax.request({
                url: CONFIG.restRoot + '/camel/rest/'+bizUrl+'s/' + rec.data.entityId,
                method: "GET",
                callback: function (options, success, response) {
                    var entity = Ext.JSON.decode(response.responseText);
                    if (entity == null) {
                        Ext.Msg.alert(CONFIG.ALTER_TITLE_FAILURE, "实体不能为空.");
                        return;
                    }
                    Ext.Ajax.request({
                        url: CONFIG.restRoot + '/camel/rest/workflow/form?taskId=' + rec.data.id,
                        method: "GET",
                        callback: function (options, success, response) {
                            var component = Ext.JSON.decode(response.responseText);
                            var approvalWindow = Ext.create(component.componentClass, {
                                title: rec.data.name
                            });
                            approvalWindow.taskId = rec.data.id;
                            approvalWindow.down("#id").setValue(entity.id);
                            approvalWindow.down("#title").setValue(entity.title);
                            approvalWindow.down("#content").setValue(entity.content);
                            approvalWindow.down("#businessKey").setValue(bizUrl);
                            var activityHistoryStore = Ext.create('kalix.workflow.store.ActivityHistoryStore', {
                                proxy: {
                                    url: CONFIG.restRoot + '/camel/rest/workflow/activities?historyProcessId=' + rec.data.processInstanceId
                                }
                            });
                            var dataGird = Ext.create('kalix.workflow.view.ActivityHistoryGrid', {
                                store: activityHistoryStore,
                                width: 460,
                            });
                            approvalWindow.activityHistoryStore = activityHistoryStore;
                            var dataGridFieldSet = Ext.create("Ext.form.FieldSet", {
                                title: "流程历史记录"
                            });
                            dataGridFieldSet.add(dataGird);
                            approvalWindow.add(dataGridFieldSet);
                            approvalWindow.show();
                        }
                    });
                }
            });
        }
    }
);