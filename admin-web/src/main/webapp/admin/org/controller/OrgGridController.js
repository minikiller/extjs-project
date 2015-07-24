/**
 * 机构表格控制器
 *
 * @author majian <br/>
 *         date:2015-7-21
 * @version 1.0.0
 */
Ext.define('Kalix.admin.org.controller.OrgGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.orgGridController',
    /**
     * 刷新.
     * @returns {Ext.panel.Panel}
     */
    onRefersh: function () {
        var grid = Ext.getCmp("orgDataGrid");
        var store = grid.getStore();
        store.reload();
    },
    /**
     * 打开新增操作.
     * @returns {Ext.panel.Panel}
     */
    onAdd: function () {

        if (this.getView().areaId == null || this.getView().areaName == null) {
            Ext.Msg.alert(CONFIG.ALTER_TITLE_FAILURE, "请选择一个区域!");
            return;
        }
        var rows=Ext.getCmp("orgDataGrid").getSelectionModel().getSelection();
        var addFormPanel = Ext.create('Kalix.admin.org.view.OrgAddForm', {
            url: this.getView().getViewModel().get("url")
        });
        addFormPanel.getComponent("areaIdId").setValue(this.getView().areaId);
        addFormPanel.getComponent("areaName").setValue(this.getView().areaName);
        if(rows!=null&&rows.length>0){
            if(rows[0]!=null){
                addFormPanel.getComponent("parentName").setValue(rows[0].data.name);
                addFormPanel.getComponent("parentIdId").setValue(rows[0].data.id);
            }
        }else{
            addFormPanel.getComponent("parentName").setValue("根机构");
            addFormPanel.getComponent("parentIdId").setValue(-1);
        }
        var win = Ext.create('Ext.Window', {
            width: 400,
            height: 250,
            border: false,
            modal: true,
            //resizable:false,
            icon: 'admin/resources/images/script_add.png',
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
        var editFormPanel = Ext.create('Kalix.admin.org.view.OrgEditForm', {
            url: this.getView().getViewModel().get("url")
        });
        var OrgModel = Ext.create("Kalix.admin.org.model.OrgModel", {
            id: rec.data.id,
            name: rec.data.name,
            code: rec.data.code,
            centerCode: rec.data.centerCode
        });
        editFormPanel.getComponent("areaIdId").setValue(this.getView().areaId);
        editFormPanel.getComponent("areaName").setValue(this.getView().areaName);
        editFormPanel.getComponent("parentName").setValue(rec.data.parentName);
        editFormPanel.loadRecord(OrgModel);

        var win = Ext.create('Ext.Window', {
            width: 400,
            height: 250,
            border: false,
            modal: true,
            //resizable:false,
            icon: 'admin/resources/images/script_edit.png',
            title: this.getView().getViewModel().get("editTitle"),
            items: [editFormPanel]
        });

        win.show();
    },
    /**
     * 批量删除操作.
     */
    onDeleteAll: function () {
        var selModel = Ext.getCmp("userDataGrid").getSelectionModel();
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
                        url: "/userDeleteAllServlet?ids=" + ids,
                        method: "GET",
                        callback: function (options, success, response) {
                            var resp = Ext.JSON.decode(response.responseText);
                            Ext.MessageBox.alert(CONFIG.ALTER_TITLE_INFO, resp.msg);
                            if (resp.success) {
                                var username = Ext.getCmp("username").getValue();
                                var name = Ext.getCmp("name").getValue();
                                var sex = Ext.getCmp("sex").getValue();
                                var status = Ext.getCmp("status").getValue();
                                var grid = Ext.getCmp("userDataGrid");
                                var store = grid.getStore();
                                store.reload({
                                    params: {
                                        start: 0,
                                        limit: pageSize,
                                        username: username,
                                        name: name,
                                        sex: sex,
                                        status: status
                                    }
                                });
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
                            var grid = Ext.getCmp("orgDataGrid");
                            var store = grid.getStore();
                            store.reload();
                        }
                    }
                });
            }
        });
    }
});