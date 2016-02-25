/**
 * 流程历史表格控制器
 *
 * @author majian <br/>
 *         date:2015-6-18
 * @version 1.0.0
 */
Ext.define('kalix.workflow.myprocesshistory.controller.MyProcessHistoryGridController', {
    extend: 'kalix.controller.BaseGridController',
    alias: 'controller.myProcessHistoryGridController',

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
                        var activityHistoryStore = Ext.create('kalix.workflow.store.ActivityHistoryStore', {
                            proxy: {
                                url: CONFIG.restRoot + '/camel/rest/workflow/activities?historyProcessId=' + rec.data.id
                            }
                        });
                        var dataGird = Ext.create('kalix.workflow.view.ActivityHistoryGrid', {
                            store: activityHistoryStore,
                            width: 605,
                            //height: 280
                        });
                        var dataGridFieldSet = Ext.create('Ext.form.FieldSet', {
                            title: '流程历史列表'
                        });
                        dataGridFieldSet.add(dataGird);
                        var showFormPanel = Ext.create(component.componentClass);
                        showFormPanel.down('#title').setValue(entity.title);
                        showFormPanel.down('#content').setValue(entity.content);
                        var win = Ext.create('Ext.Window', {
                            border: false,
                            modal: true,
                            width: 605,
                            //height: 480,
                            title: '流程历史查看',
                            //resizable:false,
                            icon: 'admin/resources/images/group_edit.png',
                            items: [showFormPanel, dataGridFieldSet]
                        });
                        //this.getView().getViewModel.set('rec',record);
                        win.show();
                    }
                });
            }
        });

    }
});