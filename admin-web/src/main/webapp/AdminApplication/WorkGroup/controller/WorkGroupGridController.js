/**
 * 工作组表格控制器
 *
 * @author majian <br/>
 *         date:2015-7-10
 * @version 1.0.0
 */
Ext.define('kalix.AdminApplication.WorkGroup.controller.WorkGroupGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.workGroupGridController',
    requires: [
        'kalix.AdminApplication.User.view.UserAddItemSelector',
        'kalix.AdminApplication.Role.view.RoleAddItemSelector'
    ],
    /**
     * 打开新增操作.
     * @returns {Ext.panel.Panel}
     */
    onAdd: function () {
        var addFormPanel = Ext.create('kalix.AdminApplication.WorkGroup.view.WorkGroupAddForm', {
            url: this.getView().getViewModel().get("url")
        });
        var win = Ext.create('Ext.Window', {
            width: 400,
            height: 195,
            border: false,
            modal: true,
            //resizable:false,
            icon: 'resources/images/cup_add.png',
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
        var editFormPanel = Ext.create('kalix.AdminApplication.WorkGroup.view.WorkGroupEditForm', {
            url: this.getView().getViewModel().get("url")
        });
        var dictModel = Ext.create("kalix.AdminApplication.WorkGroup.model.WorkGroupModel", {
            id: rec.data.id,
            name: rec.data.name,
            remark: rec.data.remark
        });
        editFormPanel.loadRecord(dictModel);

        var win = Ext.create('Ext.Window', {
            width: 400,
            height: 195,
            border: false,
            modal: true,
            //resizable:false,
            icon: 'resources/images/cup_edit.png',
            title: this.getView().getViewModel().get("editTitle"),
            items: [editFormPanel]
        });

        win.show();
    },
    /**
     * 保存添加信息
     */
    onSaveAddUser: function (workGroupUserUrl, userAddForm, rec) {
        if (userAddForm != null && userAddForm.isValid()) {
            var userIds = userAddForm.down("#userAddItemSelector").getValue();
            var groupId = rec.data.id;
            Ext.Ajax.request({
                url: workGroupUserUrl,
                paramsAsJson: true,
                params: {
                    "groupId": groupId,
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
     * 保存添加信息
     */
    onSaveAddRole: function (workGroupRoleUrl, roleAddForm, rec) {
        if (roleAddForm != null && roleAddForm.isValid()) {
            var roleIds = roleAddForm.down("#roleAddItemSelector").getValue();
            var groupId = rec.data.id;
            Ext.Ajax.request({
                url: workGroupRoleUrl,
                paramsAsJson: true,
                params: {
                    "groupId": groupId,
                    "roleIds": roleIds.join(',')
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
            Ext.MessageBox.alert(CONFIG.ALTER_TITLE_INFO, "请选择要添加用户的工作组!");
            return;
        }

        var win = Ext.create('Ext.Window', {
            width: 710,
            height: 460,
            border: false,
            modal: true,
            //resizable:false,
            icon: 'resources/images/group_add.png',
            title: "添加用户",
            items: [
                {
                    xtype: 'displayfield',
                    //labelAlign: 'right',
                    fieldLabel: '&nbsp;&nbsp;&nbsp;&nbsp;工作组',
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
        var workGroupUserUrl = this.getView().getViewModel().get("url") + "/workGroupUsers";
        var me = this;
        //获得已选用户
        Ext.Ajax.request({
            url: workGroupUserUrl + "/users/" + rec.data.id,
            method: "GET",
            callback: function (options, success, response) {
                var users = Ext.JSON.decode(response.responseText);
                var dataSotre = Ext.create("kalix.AdminApplication.User.store.UserItemSelectorStore");
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
                            text: '保存', handler: function () {
                            me.onSaveAddUser(workGroupUserUrl, this.up('#addUserForm'), rec);
                        }
                        },
                        {
                            text: '重置', handler: function () {
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
     * 添加角色.
     */
    onAddRole: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        if (rec == null) {
            Ext.MessageBox.alert(CONFIG.ALTER_TITLE_INFO, "请选择要添加角色的工作组!");
            return;
        }

        var win = Ext.create('Ext.Window', {
            width: 710,
            height: 460,
            border: false,
            modal: true,
            //resizable:false,
            icon: 'resources/images/user_add.png',
            title: "添加角色",
            items: [
                {
                    xtype: 'displayfield',
                    labelAlign: 'right',
                    fieldLabel: '&nbsp;&nbsp;&nbsp;&nbsp;工作组',
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
        var workGroupRoleUrl = this.getView().getViewModel().get("url") + "/workGroupRoles";
        var me = this;
        //获得已选角色
        Ext.Ajax.request({
            url: workGroupRoleUrl + "/roles/" + rec.data.id,
            method: "GET",
            callback: function (options, success, response) {
                var roles = Ext.JSON.decode(response.responseText);
                var dataSotre = Ext.create("kalix.AdminApplication.Role.store.RoleItemSelectorStore");
                var addRoleForm = Ext.create('Ext.form.Panel', {
                    width: 700,
                    itemId: "addRoleForm",
                    bodyPadding: 10,
                    height: 400,
                    layout: 'fit',
                    items: [
                        {
                            itemId: 'roleAddItemSelector',
                            xtype: 'roleAddItemSelector',
                            value: roles,
                            store: dataSotre
                        }
                    ],
                    buttons: [
                        {
                            text: '保存', handler: function () {
                            me.onSaveAddRole(workGroupRoleUrl, this.up('#addRoleForm'), rec);
                        }
                        },
                        {
                            text: '重置', handler: function () {
                            var field = this.up('#addRoleForm').down("#roleAddItemSelector");
                            if (!field.disabled) {
                                field.clearValue();
                            }
                        }
                        }
                    ]
                });
                win.add(addRoleForm);
                loadMask.hide();
            }
        });
    },
    /**
     * 批量删除操作.
     */
    onDeleteAll: function () {
        var selModel = Ext.getCmp("workGroupDataGrid").getSelectionModel();
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
    }
});