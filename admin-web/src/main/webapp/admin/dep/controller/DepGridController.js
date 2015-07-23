/**
 * 部门表格控制器
 *
 * @author majian <br/>
 *         date:2015-7-21
 * @version 1.0.0
 */
Ext.define('Kalix.admin.dep.controller.DepGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.depGridController',
    /**
     * 打开新增操作.
     * @returns {Ext.panel.Panel}
     */
    onAdd: function () {
        if(this.getView().orgId==null||this.getView().orgName==null){
            Ext.Msg.alert(CONFIG.ALTER_TITLE_FAILURE,"请选择一个机构!");
            return;
        }
        var rows=Ext.getCmp("depDataGrid").getSelectionModel().getSelection();
        var addFormPanel = Ext.create('Kalix.admin.dep.view.DepAddForm', {
            url: this.getView().getViewModel().get("url")
        });
        addFormPanel.getComponent("orgIdId").setValue(this.getView().orgId);
        addFormPanel.getComponent("orgName").setValue(this.getView().orgName);
        if(rows!=null&&rows.length>0){
            if(rows[0]!=null){
                addFormPanel.getComponent("parentName").setValue(rows[0].data.name);
                addFormPanel.getComponent("parentIdId").setValue(rows[0].data.id);
            }
        }else{
            addFormPanel.getComponent("parentName").setValue("根部门");
            addFormPanel.getComponent("parentIdId").setValue(-1);
        }
        var win = Ext.create('Ext.Window', {
            width: 400,
            height: 245,
            border: false,
            modal: true,
            //resizable:false,
            icon: 'admin/resources/images/book_add.png',
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
        var editFormPanel = Ext.create('Kalix.admin.dep.view.DepEditForm', {
            url: this.getView().getViewModel().get("url")
        });
        var depModel = Ext.create("Kalix.admin.dep.model.DepModel", {
            id: rec.data.id,
            name: rec.data.name,
            code: rec.data.code,
            centerCode: rec.data.centerCode
        });
        editFormPanel.getComponent("parentName").setValue(rec.data.parentName);
        editFormPanel.getComponent("orgIdId").setValue(this.getView().orgId);
        editFormPanel.getComponent("orgName").setValue(this.getView().orgName);
        editFormPanel.loadRecord(depModel);

        var win = Ext.create('Ext.Window', {
            width: 400,
            height: 245,
            border: false,
            modal: true,
            //resizable:false,
            icon: 'admin/resources/images/book_edit.png',
            title: this.getView().getViewModel().get("editTitle"),
            items: [editFormPanel]
        });

        win.show();
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
                            var grid = Ext.getCmp("depDataGrid");
                            var store = grid.getStore();
                            store.reload();
                        }
                    }
                });
            }
        });
    }
});