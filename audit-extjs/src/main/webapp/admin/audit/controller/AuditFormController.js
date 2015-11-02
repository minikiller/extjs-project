/**
 * 用户表单控制器
 *
 * @author majian
 *         date:2015-6-18
 * @version 1.0.0
 */
Ext.define('kalix.admin.audit.controller.AuditFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.auditFormController',

    /**
     * 重置操作.
     * @returns {Ext.panel.Panel}
     */
    onAddReset: function () {
        this.getView().reset();
    },
    /**
     * 重置操作.
     * @returns {Ext.panel.Panel}
     */
    onEditReset: function () {
        this.getView().reset();
    },
    /**
     * 保存操作.
     * @returns {Ext.panel.Panel}
     */
    onSave: function () {
        var form = this.getView();
        if (form.isValid()) {
            form.submit({
                success: function (form, action) {
                    Ext.Msg.alert(CONFIG.ALTER_TITLE_SUCCESS, action.result.msg);
                    var grid = Ext.ComponentQuery.query('auditGrid')[0];
                    var store = grid.getStore();
                    store.reload();
                    /*var auditname = Ext.getCmp("auditname").getValue();
                     var name = Ext.getCmp("name").getValue();
                     var sex = Ext.getCmp("sex").getValue();
                     var status = Ext.getCmp("status").getValue();
                     store.reload({
                     params: {
                     start: 0,
                     limit: pageSize,
                     auditname: auditname,
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
        var form = this.getView();
        if (form.isValid()) {
            form.submit({
                success: function (form, action) {
                    Ext.Msg.alert(CONFIG.ALTER_TITLE_SUCCESS, action.result.msg);
                    var grid = Ext.ComponentQuery.query('auditGrid')[0];
                    ;
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