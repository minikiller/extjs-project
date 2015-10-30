/**
 * 编辑信息
 * @author majian <br/>
 *         date:2015-8-5
 * @version 1.0.0
 */
Ext.define('kalix.demo.notice.view.ModifyWindow', {
    extend: 'Ext.Window',
    xtype: 'modifyWindow',
    width: 500,
    height: 430,
    data: {
        taskId: null,
        activityHistoryStore: null
    },
    border: false,
    modal: true,
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
                name: 'title'
            },
            {
                fieldLabel: '内容',
                xtype: 'textarea',
                itemId: 'content',
                name: "content"
            }
        ],
        buttons: [
            {
                text: '保存', glyph: 0xf0c7, type: 'submit', handler: function () {
                var approvalForm = Ext.ComponentQuery.query('modifyWindow')[0].down("#approvalForm");
                var activityHistoryStore = Ext.ComponentQuery.query('modifyWindow')[0].activityHistoryStore;
                approvalForm.submit({
                    success: function (form, action) {
                        if (action.result.failure) {
                            Ext.MessageBox.alert(CONFIG.ALTER_TITLE_FAILURE, action.result.msg);
                            return;
                        }
                        Ext.Ajax.request({
                            url: "/kalix/camel/rest/demos/modifyTask?taskId=" + Ext.ComponentQuery.query('modifyWindow')[0].taskId,
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
                Ext.ComponentQuery.query('modifyWindow')[0].close();
            }
            }
        ]
    }]

});