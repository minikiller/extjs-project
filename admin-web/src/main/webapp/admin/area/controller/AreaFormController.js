/**
 * 区域表单控制器
 *
 * @author majian <br/>
 *         date:2015-7-21
 * @version 1.0.0
 */
Ext.define('Kalix.admin.area.controller.AreaFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.areaFormController',

    /**
     * 重置操作.
     * @returns {Ext.panel.Panel}
     */
    onAddReset: function () {
        Ext.getCmp("areaAddForm").reset();
    },
    /**
     * 重置操作.
     * @returns {Ext.panel.Panel}
     */
    onEditReset: function () {
        Ext.getCmp("areaEditForm").reset();
    },
    /**
     * 保存操作.
     * @returns {Ext.panel.Panel}
     */
    onSave: function () {
        var form = Ext.getCmp("areaAddForm");
        if (form.isValid()) {
            form.submit({
                success: function (form, action) {
                    Ext.Msg.alert(CONFIG.ALTER_TITLE_SUCCESS, action.result.msg);
                    var grid = Ext.getCmp("areaDataGrid");
                    var store = grid.getStore();
                    store.reload();
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
        var form = Ext.getCmp("areaEditForm");
        if (form.isValid()) {
            form.submit({
                success: function (form, action) {
                    Ext.Msg.alert(CONFIG.ALTER_TITLE_SUCCESS, action.result.msg);
                    var grid = Ext.getCmp("areaDataGrid");
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