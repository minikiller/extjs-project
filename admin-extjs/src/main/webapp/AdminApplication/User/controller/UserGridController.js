/**
 * 用户表格控制器
 *
 * @author majian <br/>
 *         date:2015-6-18
 * @version 1.0.0
 */
Ext.define('kalix.AdminApplication.User.controller.UserGridController', {
    extend: 'Ext.app.ViewController',
    requires:['kalix.core.Notify'],
    alias: 'controller.userGridController',
    /**
     * 打开新增操作.
     * @returns {Ext.panel.Panel}
     */
    onAdd: function () {

        var addFormPanel = Ext.create('kalix.AdminApplication.User.view.UserAddForm', {
            url: this.getView().getViewModel().get("url")
        });
        var win = Ext.create('Ext.Window', {
            width: 400,
            border: false,
            modal: true,
            //resizable:false,
            icon: 'admin/resources/images/group_add.png',
            title: this.getView().getViewModel().get("addTitle"),
            items: [addFormPanel]
        });

        win.show();
    },
    /**
     * 打开编辑操作.
     * @param grid
     * @param rowIndex
     * @param colIndex
     */
    onEdit: function () {
        var grid = Ext.ComponentQuery.query('userGridPanel')[0];
        var selModel = grid.getSelectionModel();
        if (selModel.hasSelection()) {
            var rows = selModel.getSelection();
            if (rows.length > 1) {
                Ext.Msg.alert(CONFIG.ALTER_TITLE_ERROR, "请选择一条要编辑的记录！");
                return;
            }
            var rec = rows[0];

            var editFormPanel = Ext.create('kalix.AdminApplication.User.view.UserEditForm', {
                url: this.getView().getViewModel().get("url")
            });
            editFormPanel.down("#confirmPasswordId").setValue(rec.data.password);
            editFormPanel.loadRecord(rec);

            var win = Ext.create('Ext.Window', {
                width: 400,
                border: false,
                modal: true,
                //resizable:false,
                icon: 'admin/resources/images/group_edit.png',
                title: this.getView().getViewModel().get("editTitle"),
                items: [editFormPanel]
            });

            win.show();
        } else {
            Ext.Msg.alert(CONFIG.ALTER_TITLE_ERROR, "请选择要编辑的记录！");
        }
    },
    /**
     * 批量删除操作.
     */
    onDeleteAll: function () {
        var selModel = Ext.ComponentQuery.query('#userDataGrid').getSelectionModel();
        if (selModel.hasSelection()) {
            Ext.Msg.confirm("警告", "确定要删除吗？", function (button) {
                if (button == "yes") {
                    var deleteUrl = this.getView().getViewModel().get("url");
                    var rows = selModel.getSelection();
                    var ids = "";
                    for (var i = 0; i < rows.length; i++) {
                        if (rows[i] != null && rows[i].id != null) {
                            ids += rows[i].id;
                            if (i + 1 != rows.length) {
                                ids += "_";
                            }
                        }
                    }
                    Ext.Ajax.request({
                        url: deleteUrl + "?id=" + rec.id,
                        method: 'DELETE',
                        callback: function (options, success, response) {
                            var resp = Ext.JSON.decode(response.responseText);
                            Ext.MessageBox.alert(CONFIG.ALTER_TITLE_INFO, resp.msg);
                            if (resp.success) {
                                var store = grid.getStore();
                                store.reload();
                            }
                        }
                    });
                }
            });
        } else {
            Ext.Msg.alert(CONFIG.ALTER_TITLE_ERROR, "请选择要删除的记录！");
        }
    },
    /**
     * 删除单个操作.
     * @param grid
     * @param rowIndex
     * @param colIndex
     */
    onDelete: function () {
        var grid = Ext.ComponentQuery.query('userGridPanel')[0];
        var selModel = grid.getSelectionModel();
        var deleteUrl = this.getView().getViewModel().get("url");
        if (selModel.hasSelection()) {
            var rows = selModel.getSelection();
            if (rows.length > 1) {
                Ext.Msg.alert(CONFIG.ALTER_TITLE_ERROR, "请选择一条要删除的记录！");
                return;
            }
            var rec = rows[0];
            Ext.Msg.confirm("警告", "确定要删除吗？", function (button) {
                if (button == "yes") {
                    Ext.Ajax.request({
                        url: deleteUrl + "?id=" + rec.id,
                        method: 'DELETE',
                        callback: function (options, success, response) {
                            var resp = Ext.JSON.decode(response.responseText);
                            Ext.MessageBox.alert(CONFIG.ALTER_TITLE_INFO, resp.msg);
                            if (resp.success) {
                                var store = grid.getStore();
                                store.reload();
                            }
                        }
                    });
                }
            });
        } else {
             //Ext.Msg.alert(CONFIG.ALTER_TITLE_ERROR, "请选择要删除的记录！");
            this.showError( "请选择要删除的记录！",CONFIG.ALTER_TITLE_ERROR);
        }
    },
    showError: function (msg,title){
        kalix.core.Notify.error( msg,title);
    }
});