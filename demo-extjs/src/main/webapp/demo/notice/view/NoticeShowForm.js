Ext.define('kalix.demo.notice.view.NoticeShowForm', {
    extend: 'Ext.Window',
    requires: [
        'kalix.demo.carApply.view.CarApplyViewForm'
    ],
    xtype: 'noticeShowForm',
    width: 840,
    data: {
        taskId: null,
        activityHistoryStore: null
    },
    buttonAlign: "center",
    border: false,
    modal: true,
    title: "",
    items: [
        {
            xtype: 'carApplyViewForm',
            layout: {
                type: 'table',
                columns: 6
            }
        }
    ],
    buttons: [
        {
            text: '关闭', iconCls:'iconfont icon-reset iconfont-btn-small',
            handler: function () {
                Ext.ComponentQuery.query('noticeShowForm')[0].close();
            }
        }
    ]
});