/**
 * 机构表格控制器
 *
 * @author zangyanming <br/>
 *         date:2016-3-10
 * @version 1.0.0
 */
Ext.define('kalix.admin.orgNoArea.controller.OrgNoAreaGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.orgNoAreaGridController',
    /**
     * 刷新.
     * @returns {Ext.panel.Panel}
     */
    onRefersh: function () {
        var grid = this.getView();
        var store = grid.getStore();
        store.setProxy({
            type: 'ajax',
            url: CONFIG.restRoot + '/camel/rest/orgs/'
        });
        store.reload();
    },
    /**
     * 展开.
     * @returns {Ext.panel.Panel}
     */
    onOrgExpandAll: function () {
        this.getView().expandAll();
    },
    /**
     * 机构收起
     */
    onOrgCollapseAll: function () {
        this.getView().collapseAll();
    },
    /**
     * 打开新增操作.
     * @returns {Ext.panel.Panel}
     */
    onAdd: function () {
        var rows = this.getView().getSelectionModel().getSelection();
        var addFormPanel = Ext.create('kalix.admin.orgNoArea.view.OrgNoAreaAddForm', {
            url: this.getView().getViewModel().get("url"),
        });
        if(rows!=null&&rows.length>0){
            if(rows[0]!=null){
                addFormPanel.down("#parentName").setValue(rows[0].data.name);
                addFormPanel.down("#parentIdId").setValue(rows[0].data.id);
            }
        }else{
            addFormPanel.down("#parentName").setValue("根机构");
            addFormPanel.down("#parentIdId").setValue(-1);
        }
        var win = Ext.create('Ext.Window', {
            width: 400,
            border: false,
            modal: true,
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
        var editFormPanel = Ext.create('kalix.admin.orgNoArea.view.OrgNoAreaEditForm', {
            url: this.getView().getViewModel().get("url")
        });
        var OrgNoAreaModel = Ext.create("kalix.admin.orgNoArea.model.OrgNoAreaModel", {
            id: rec.data.id,
            name: rec.data.name,
            code: rec.data.code
        });
        editFormPanel.getComponent("parentName").setValue(rec.data.parentName);
        editFormPanel.loadRecord(OrgNoAreaModel);

        var win = Ext.create('Ext.Window', {
            width: 400,
            //height: 250,
            border: false,
            modal: true,
            icon: 'admin/resources/images/script_edit.png',
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
                            var store = grid.getStore();
                            store.reload();
                        }
                    }
                });
            }
        });
    }
});