/**
 * 审批窗口
 * @author majian <br/>
 *         date:2015-8-5
 * @version 1.0.0
 */
Ext.define('Kalix.demo.view.AuditWindow', {
    extend: 'Ext.Window',
    xtype: 'auditWindow',
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
            }, {
                xtype: 'combobox',
                fieldLabel: '状态',
                editable: false,
                itemId: 'approvalStatus',
                value: '1',
                store: [
                    ['1', '同意'],
                    ['0', '不同意']
                ]
            },
            {
                fieldLabel: '审批意见',
                xtype: 'textarea',
                itemId: 'approvalContent'
            }
        ],
        buttons: [
            {
                text: '保存', glyph: 0xf0c7, type: 'submit', handler: function () {
                var approvalForm = Ext.ComponentQuery.query('auditWindow')[0].down("#approvalForm");
                var status = approvalForm.down("#approvalStatus").getValue();
                var content = approvalForm.down("#approvalContent").getValue();
                if (status == "1") {
                    status = "同意";
                } else {
                    status = "不同意";
                }
                if (content == null) {
                    content = " ";
                }
                var activityHistoryStore = Ext.ComponentQuery.query('auditWindow')[0].activityHistoryStore;
                var hookFunction = Ext.ComponentQuery.query('auditWindow')[0].hookFunction;
                Ext.Ajax.request({
                    url: "/kalix/camel/rest/demos/completeTask?taskId=" + Ext.ComponentQuery.query('auditWindow')[0].taskId + "&accepted=" + status + "&comment=" + content,
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
            }
            },
            {
                text: '关闭', glyph: 0xf0e2, handler: function () {
                Ext.ComponentQuery.query('auditWindow')[0].close();
            }
            }
        ]
    }]

});