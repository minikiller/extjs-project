/**
 * 用户表单控制器
 *
 * @author majian <br/>
 *         date:2015-6-18
 * @version 1.0.0
 */
Ext.define('Kalix.notice.controller.NoticeFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.noticeFormController',

    /**
     * 重置操作.
     * @returns {Ext.panel.Panel}
     */
    onAddReset: function () {
        Ext.getCmp("noticeAddForm").getComponent("confirmPasswordId").setValue("");
        Ext.getCmp("noticeAddForm").reset();
    },
    /**
     * 重置操作.
     * @returns {Ext.panel.Panel}
     */
    onEditReset: function () {
        Ext.getCmp("noticeEditForm").getComponent("confirmPasswordId").setValue("");
        Ext.getCmp("noticeEditForm").reset();
    },
    /**
     * 保存操作.
     * @returns {Ext.panel.Panel}
     */
    onSave: function () {
        var form = Ext.getCmp("noticeAddForm");
        if (form.isValid()) {
            form.submit({
                success: function (form, action) {
                    Ext.Msg.alert(CONFIG.ALTER_TITLE_SUCCESS, action.result.msg);
                    var grid = Ext.getCmp("noticeDataGrid");
                    var store = grid.getStore();
                    store.reload();
                    /*var noticename = Ext.getCmp("noticename").getValue();
                     var name = Ext.getCmp("name").getValue();
                     var sex = Ext.getCmp("sex").getValue();
                     var status = Ext.getCmp("status").getValue();
                     store.reload({
                     params: {
                     start: 0,
                     limit: pageSize,
                     noticename: noticename,
                     name: name,
                     sex: sex,
                     status: status
                     }
                     });*/
                },
                failure: function (form, action) {
                    Ext.Msg.alert(CONFIG.ALTER_TITLE_FAILURE, action.result.msg);
                }
            });
        }
    },
    /**
     * 更新操作.
     * @returns {Ext.panel.Panel}
     */
    onUpdate: function () {
        var form = Ext.getCmp("noticeEditForm");
        if (form.isValid()) {
            form.submit({
                success: function (form, action) {
                    Ext.Msg.alert(CONFIG.ALTER_TITLE_SUCCESS, action.result.msg);
                    var grid = Ext.getCmp("noticeDataGrid");
                    var store = grid.getStore();
                    store.reload();
                },
                failure: function (form, action) {
                    Ext.Msg.alert(CONFIG.ALTER_TITLE_FAILURE, action.result.msg);
                }
            });
        }
    }
});