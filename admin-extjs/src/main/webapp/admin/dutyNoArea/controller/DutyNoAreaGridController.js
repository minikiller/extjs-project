/**
 * 职位表格控制器
 *
 * @author zangyanming <br/>
 *         date:2016-3-10
 * @version 1.0.0
 */
Ext.define('kalix.admin.dutyNoArea.controller.DutyNoAreaGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dutyNoAreaGridController',
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
     * 打开新增操作.
     * @returns {Ext.panel.Panel}
     */
    onAdd: function () {
        if(this.getView().depid==null||this.getView().depName==null){
            Ext.Msg.alert(CONFIG.ALTER_TITLE_FAILURE, '请选择一个部门!');
            return;
        }
        var rows = this.getView().getSelectionModel().getSelection();
        var addFormPanel = Ext.create('kalix.admin.dutyNoArea.view.DutyNoAreaAddForm', {
            url: this.getView().getViewModel().get('url')
        });
        addFormPanel.down('#depid').setValue(this.getView().depid);
        addFormPanel.down('#depName').setValue(this.getView().depName);

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
        var editFormPanel = Ext.create('kalix.admin.dutyNoArea.view.DutyNoAreaEditForm', {
            url: this.getView().getViewModel().get('url')
        });
        editFormPanel.down('#depName').setValue(this.getView().depName);
        editFormPanel.down('#nameId').setValue(this.getView().name);
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
    onSaveAddUser: function (dutyUserUrl, userAddForm, rec) {
        if (userAddForm != null && userAddForm.isValid()) {
            var userIds = userAddForm.down('#userAddItemSelector').getValue();
            var depNoAreaId = rec.data.depid;
            var dutyNoAreaId = rec.data.id;
            Ext.Ajax.request({
                url: dutyUserUrl,
                paramsAsJson: true,
                params: {
                    'depId': depNoAreaId,
                    'dutyid':dutyNoAreaId,
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
            Ext.MessageBox.alert(CONFIG.ALTER_TITLE_INFO, '请选择要添加用户的职位!');
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
                    fieldLabel: '&nbsp;&nbsp;&nbsp;&nbsp;职位',
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
        var dutyUserUrl = this.getView().getViewModel().get('url') + '/dutyUsers';
        //var dutyUserUrl = '/kalix/camel/rest/deps/departmentUsers';
        var me = this;
        //获得已选用户
        Ext.Ajax.request({
            url: dutyUserUrl + '/users/' + rec.data.depid +'/' + rec.data.id,
            method: 'GET',
            callback: function (options, success, response) {
                var users = Ext.JSON.decode(response.responseText);
                var dataSotre = Ext.create('kalix.admin.user.store.UserItemSelectorStore');
                dataSotre.setProxy({
                    type: 'ajax',
                    limitParam: null,
                    url: dutyUserUrl + '/users/all/'  + rec.data.depid +'/'+ rec.data.id,
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
                            me.onSaveAddUser(dutyUserUrl, this.up('#addUserForm'), rec);
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
                    url: deleteUrl + '/'+rec.data.depid + '/' + rec.id,
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