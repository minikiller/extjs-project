/**
 * 应用表格控制器
 *
 * @author majian <br/>
 *         date:2015-6-18
 * @version 1.0.0
 */
Ext.define('Kalix.app.application.controller.ApplicationGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.applicationGridController',
    /**
     * 打开新增操作.
     * @returns {Ext.panel.Panel}
     */
    onAdd: function () {

        var addFormPanel = Ext.create('Kalix.app.application.view.ApplicationAddForm', {
            url: this.getView().getViewModel().get("url")
        });
        var win = Ext.create('Ext.Window', {
            width: 400,
            height: 252,
            border: false,
            modal: true,
            //resizable:false,
            icon: 'app/resources/images/application_add.png',
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
    onEdit: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var editFormPanel = Ext.create('Kalix.app.application.view.ApplicationEditForm', {
            url: this.getView().getViewModel().get("url")
        });
        editFormPanel.loadRecord(rec);

        var win = Ext.create('Ext.Window', {
            width: 400,
            height: 252,
            border: false,
            modal: true,
            //resizable:false,
            icon: 'app/resources/images/application_edit.png',
            title: this.getView().getViewModel().get("editTitle"),
            items: [editFormPanel]
        });

        win.show();
    },
    /**
     * 批量删除操作.
     */
    onDeleteAll: function () {

        var selModel = Ext.ComponentQuery.query('#applicationDataGrid').getSelectionModel();
        if (selModel.hasSelection()) {
            Ext.Msg.confirm("警告", "确定要删除吗？", function (button) {
                if (button == "yes") {
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
                        url: "/applicationDeleteAllServlet?ids=" + ids,
                        method: "GET",
                        callback: function (options, success, response) {
                            var resp = Ext.JSON.decode(response.responseText);
                            Ext.MessageBox.alert(CONFIG.ALTER_TITLE_INFO, resp.msg);
                            if (resp.success) {
                                //var applicationname = Ext.getCmp("applicationname").getValue();
                                //var name = Ext.getCmp("name").getValue();
                                //var sex = Ext.getCmp("sex").getValue();
                                //var status = Ext.getCmp("status").getValue();
                                //var grid = Ext.getCmp("applicationDataGrid");
                                //var store = grid.getStore();
                                //store.reload({
                                //    params: {
                                //        start: 0,
                                //        limit: pageSize,
                                //        applicationname: applicationname,
                                //        name: name,
                                //        sex: sex,
                                //        status: status
                                //    }
                                //});
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
    onDelete: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var deleteUrl = this.getView().getViewModel().get("url");
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
    }
});