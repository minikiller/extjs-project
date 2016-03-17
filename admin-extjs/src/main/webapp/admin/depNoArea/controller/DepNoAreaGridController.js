/**
 * 部门表格控制器
 *
 * @author zangyanming <br/>
 *         date:2016-3-10
 * @version 1.0.0
 */
Ext.define('kalix.admin.depNoArea.controller.DepNoAreaGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.depNoAreaGridController',
    requires: [
        'kalix.admin.user.view.UserAddItemSelector'
    ],
    /**
     * 刷新.
     * @returns {Ext.panel.Panel}
     */
    onRefersh: function () {
        var grid = this.getView();
        var store = grid.getStore();
        store.reload();
    },
    /**
     * 展开.
     * @returns {Ext.panel.Panel}
     */
    onExpandAll: function () {
        this.getView().expandAll();
    },
    /**
     * 机构收起
     */
    onCollapseAll: function () {
        this.getView().collapseAll();
    },
    /**
     * 打开新增操作.
     * @returns {Ext.panel.Panel}
     */
    onAdd: function () {
        var OrgTreeList = this.getView().findParentByType('panel').items.getAt(0).items.getAt(0);
        var rows = OrgTreeList.getSelectionModel().getSelection();
        if(rows.length<=0){
            Ext.Msg.alert(CONFIG.ALTER_TITLE_FAILURE, '请选择一个机构!');
            return;
        }
        var addFormPanel = Ext.create('kalix.admin.depNoArea.view.DepNoAreaAddForm', {
            url: this.getView().getViewModel().get('url')
        });
        addFormPanel.down('#orgIdId').setValue(this.getView().orgId);
        addFormPanel.down('#orgName').setValue(this.getView().orgName);
        if(rows!=null&&rows.length>0){
            if(rows[0]!=null){
                addFormPanel.down('#parentName').setValue(rows[0].data.name);
                addFormPanel.down('#parentIdId').setValue(rows[0].data.id);
            }
        }else{
            addFormPanel.down('#parentName').setValue('根部门');
            addFormPanel.down('#parentIdId').setValue(-1);
        }
        var win = Ext.create('Ext.Window', {
            width: 400,
            border: false,
            modal: true,
            icon: 'admin/resources/images/building_add.png',
            title: this.getView().getViewModel().get('addTitle'),
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
        var editFormPanel = Ext.create('kalix.admin.depNoArea.view.DepNoAreaEditForm', {
            url: this.getView().getViewModel().get('url')
        });
        editFormPanel.down('#parentName').setValue(rec.data.parentName);
        editFormPanel.down('#orgName').setValue(this.getView().orgName);
        editFormPanel.loadRecord(rec);

        var win = Ext.create('Ext.Window', {
            width: 400,
            border: false,
            modal: true,
            icon: 'admin/resources/images/building_edit.png',
            title: this.getView().getViewModel().get('editTitle'),
            items: [editFormPanel]
        });

        win.show();
    },
    /**
     * 保存添加信息
     */
    onSaveAddUser: function (departmentUserUrl, userAddForm, rec) {
        if (userAddForm != null && userAddForm.isValid()) {
            var userIds = userAddForm.down('#userAddItemSelector').getValue();
            var depNoAreaId = rec.data.id;
            Ext.Ajax.request({
                url: departmentUserUrl,
                paramsAsJson: true,
                params: {
                    'depId': depNoAreaId,
                    'userIds': userIds.join(',')
                },
                method: 'GET',
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
            Ext.MessageBox.alert(CONFIG.ALTER_TITLE_INFO, '请选择要添加用户的部门!');
            return;
        }

        var win = Ext.create('Ext.Window', {
            width: 710,
            //height: 460,
            border: false,
            modal: true,
            //resizable:false,
            icon: 'admin/resources/images/group_add.png',
            title: '添加用户',
            items: [
                {
                    xtype: 'displayfield',
                    labelAlign: 'right',
                    fieldLabel: '&nbsp;&nbsp;&nbsp;&nbsp;部门',
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
        var departmentUserUrl = this.getView().getViewModel().get('url') + '/departmentUsers';
        var me = this;
        //获得已选用户
        Ext.Ajax.request({
            url: departmentUserUrl + '/users/' + rec.data.id,
            method: 'GET',
            callback: function (options, success, response) {
                var users = Ext.JSON.decode(response.responseText);
                var dataSotre = Ext.create('kalix.admin.user.store.UserItemSelectorStore');
                dataSotre.setProxy({
                    type: 'ajax',
                    limitParam: null,
                    url: departmentUserUrl + '/users/all/' + rec.data.id,
                    reader: {
                        type: 'json',
                        root: 'data',
                        totalProperty: 'totalCount'
                    }
                });
                var addUserForm = Ext.create('Ext.form.Panel', {
                    width: 700,
                    itemId: 'addUserForm',
                    bodyPadding: 10,
                    //height: 400,
                    layout: 'fit',
                    items: [
                        {
                            itemId: 'userAddItemSelector',
                            xtype: 'userAddItemSelector',
                            value: users,
                            height: 400,
                            store: dataSotre
                        }
                    ],
                    buttons: [
                        {
                            text: '保存', glyph: 'xf0c7@FontAwesome', handler: function () {
                            me.onSaveAddUser(departmentUserUrl, this.up('#addUserForm'), rec);
                        }
                        },
                        {
                            text: '重置', glyph: 'xf0e2@FontAwesome', handler: function () {
                            var field = this.up('#addUserForm').down('#userAddItemSelector');
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
     * 删除单个操作.
     * @param grid
     * @param rowIndex
     * @param colIndex
     */
    onDelete: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var deleteUrl = this.getView().getViewModel().get('url');
        Ext.Msg.confirm('警告', '确定要删除吗？', function (button) {
            if (button == 'yes') {
                Ext.Ajax.request({
                    url: deleteUrl + '?id=' + rec.id,
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