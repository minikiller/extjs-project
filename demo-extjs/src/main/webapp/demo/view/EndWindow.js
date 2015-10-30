/**
 * 审批窗口
 * @author majian <br/>
 *         date:2015-8-5
 * @version 1.0.0
 */
Ext.define('kalix.demo.view.EndWindow', {
    extend: 'Ext.Window',
    xtype: 'endWindow',
    width: 500,
    height: 430,
    data: {
        taskId: null,
        activityHistoryStore: null
    },
    border: false,
    modal: true,
    title: "流程审批",
    items: [{
        xtype: 'form',
        itemId: 'approvalForm',
        url: '/kalix/camel/rest/demos',
        labelAlign: 'center',
        labelWidth: 75,
        autoWidth: true,
        autoHeight: true,
        jsonSubmit: true,
        bodyStyle: "padding:15px",
        frame: true,
        buttonAlign: "center",
        defaultType: 'textfield',
        items: [
            {xtype: 'hiddenfield', itemId: 'id', name: "id"},
            {
                fieldLabel: '标题',
                itemId: 'title',
                disabled: true
            },
            {
                fieldLabel: '内容',
                xtype: 'textarea',
                itemId: 'content',
                disabled: true
            }
        ],
        buttons: [
            {
                text: '保存', glyph: 0xf0c7, type: 'submit', handler: function () {
                var approvalForm = Ext.ComponentQuery.query('endWindow')[0].down("#approvalForm");
                var activityHistoryStore = Ext.ComponentQuery.query('endWindow')[0].activityHistoryStore;
                approvalForm.submit({
                    success: function (form, action) {
                        if (action.result.failure) {
                            Ext.MessageBox.alert(CONFIG.ALTER_TITLE_FAILURE, action.result.msg);
                            return;
                        }
                        Ext.Ajax.request({
                            url: "/kalix/camel/rest/demos/modifyTask?taskId=" + Ext.ComponentQuery.query('endWindow')[0].taskId,
                            method: "GET",
                            callback: function (options, success, response) {
                                var jsonStatus = Ext.JSON.decode(response.responseText);
                                if (jsonStatus.success) {
                                    Ext.MessageBox.alert(CONFIG.ALTER_TITLE_SUCCESS, jsonStatus.msg);
                                    if (activityHistoryStore != null)
                                        activityHistoryStore.reload();
                                    return;
                                }
                                Ext.MessageBox.alert(CONFIG.ALTER_TITLE_FAILURE, jsonStatus.msg);
                                if (activityHistoryStore != null)
                                    activityHistoryStore.reload();
                                return;
                            }
                        });
                    },
                    failure: function (form, action) {
                        Ext.Msg.alert(CONFIG.ALTER_TITLE_FAILURE, action.result.msg);
                    }
                });
            }
            },
            {
                text: '关闭', glyph: 0xf0e2, handler: function () {
                Ext.ComponentQuery.query('endWindow')[0].close();
            }
            }
        ]
    }]

});