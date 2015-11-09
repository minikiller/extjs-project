/**
 * 角色表格控制器
 *
 * @author majian <br/>
 *         date:2015-7-10
 * @version 1.0.0
 */
Ext.define('kalix.admin.role.controller.RoleGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.roleGridController',
    requires: [
        'kalix.admin.user.view.UserAddItemSelector'
    ],
    /**
     * 打开新增操作.
     * @returns {Ext.panel.Panel}
     */
    onAdd: function () {
        var addFormPanel = Ext.create('kalix.admin.role.view.RoleAddForm', {
            url: this.getView().getViewModel().get("url")
        });
        var win = Ext.create('Ext.Window', {
            width: 400,
            height: 195,
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
        var editFormPanel = Ext.create('kalix.admin.role.view.RoleEditForm', {
            url: this.getView().getViewModel().get("url")
        });
        editFormPanel.loadRecord(rec);

        var win = Ext.create('Ext.Window', {
            width: 400,
            height: 195,
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
     * 保存添加信息
     */
    onSaveAddUser: function (roleUserUrl, userAddForm, rec) {
        if (userAddForm != null && userAddForm.isValid()) {
            var userIds = userAddForm.down("#userAddItemSelector").getValue();
            var roleId = rec.data.id;
            Ext.Ajax.request({
                url: roleUserUrl,
                paramsAsJson: true,
                params: {
                    "roleId": roleId,
                    "userIds": userIds.join(',')
                },
                method: "GET",
                callback: function (options, success, response) {
                    var resp = Ext.JSON.decode(response.responseText);
                    if (resp != null && resp.success) {
                        Ext.MessageBox.alert(CONFIG.ALTER_TITLE_INFO, resp.msg);
                    } else {
                        Ext.MessageBox.alert(CONFIG.ALTER_TITLE_FAILURE, resp.msg);
                    }
                }
            });
        }
    },
    /**
     * 添加用户.
     */
    onAddUser: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        if (rec == null) {
            Ext.MessageBox.alert(CONFIG.ALTER_TITLE_INFO, "请选择要添加用户的角色!");
            return;
        }

        var win = Ext.create('Ext.Window', {
            width: 710,
            height: 460,
            border: false,
            modal: true,
            //resizable:false,
            icon: 'admin/resources/images/group_add.png',
            title: "添加用户",
            items: [
                {
                    xtype: 'displayfield',
                    labelAlign: 'right',
                    fieldLabel: '&nbsp;&nbsp;&nbsp;&nbsp;角色',
                    labelWidth: 60,
                    value: rec.data.name
                }]
        });
        win.show();
        var loadMask = new Ext.LoadMask({
            msg: '加载中...',
            target: win
        });
        loadMask.show();
        var roleUserUrl = this.getView().getViewModel().get("url") + "/roleUsers";
        var me = this;
        //获得已选用户
        Ext.Ajax.request({
            url: roleUserUrl + "/users/" + rec.data.id,
            method: "GET",
            callback: function (options, success, response) {
                var users = Ext.JSON.decode(response.responseText);
                var dataSotre = Ext.create("kalix.admin.user.store.UserItemSelectorStore");
                var addUserForm = Ext.create('Ext.form.Panel', {
                    width: 700,
                    itemId: "addUserForm",
                    bodyPadding: 10,
                    height: 400,
                    layout: 'fit',
                    items: [
                        {
                            itemId: 'userAddItemSelector',
                            xtype: 'userAddItemSelector',
                            value: users,
                            store: dataSotre
                        }
                    ],
                    buttons: [
                        {
                            text: '保存', glyph: 'xf0c7@FontAwesome', handler: function () {
                            me.onSaveAddUser(roleUserUrl, this.up('#addUserForm'), rec);
                        }
                        },
                        {
                            text: '重置', glyph: 'xf0e2@FontAwesome', handler: function () {
                            var field = this.up('#addUserForm').down("#userAddItemSelector");
                            if (!field.disabled) {
                                field.clearValue();
                            }
                        }
                        }
                    ]
                });
                win.add(addUserForm);
                loadMask.hide();
            }
        });
    },
    /**
     * 批量删除操作.
     */
    onDeleteAll: function () {
        var selModel = Ext.getCmp("roleDataGrid").getSelectionModel();
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
                                //var username = Ext.getCmp("username").getValue();
                                //var name = Ext.getCmp("name").getValue();
                                //var sex = Ext.getCmp("sex").getValue();
                                //var status = Ext.getCmp("status").getValue();
                                //var grid = Ext.getCmp("userDataGrid");
                                //var store = grid.getStore();
                                //store.reload({
                                //    params: {
                                //        start: 0,
                                //        limit: pageSize,
                                //        username: username,
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
    },
    /**
     * 授权
     * @param grid
     * @param rowIndex
     * @param colIndex
     */
    onAuthorization: function (grid, rowIndex, colIndex) {
        var authorizationWindow = Ext.create('kalix.admin.app.components.AuthorizationWindow');
        var rec = grid.getStore().getAt(rowIndex);
        authorizationWindow.roleId = rec.data.id;
        authorizationWindow.authorizationUrl = this.getView().getViewModel().get("authorizationUrl");
        authorizationWindow.show();
        var store = authorizationWindow.down("#authorizationTree").getStore();
        store.setProxy({
            type: "ajax",
            url: '/kalix/camel/rest/roles/' + rec.data.id + "/authorizations"
        });
        store.reload();
    }
});