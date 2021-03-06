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
        var addFormPanel = Ext.create('kalix.admin.orgNoArea.view.OrgNoAreaAddForm');
        var model=Ext.create('Ext.data.Model');
        addFormPanel.lookupViewModel().set('rec',model);

        if(rows!=null&&rows.length>0){
            if(rows[0]!=null){
                model.set('parentName',rows[0].data.name);
                model.set('parentId',rows[0].data.id);
            }
        }else{
            model.set('parentName','根机构');
            model.set('parentId',-1);
        }
        model.modified = {};
        model.dirty = false;
        var win = Ext.create('Ext.Window', {
            width: 400,
            border: false,
            modal: true,
            iconCls: 'iconfont icon-add',
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
        var editFormPanel = Ext.create('kalix.admin.orgNoArea.view.OrgNoAreaEditForm');
        var model=Ext.create('Ext.data.Model');
        editFormPanel.lookupViewModel().set('rec',model);
        model.set('id',rec.data.id);
        model.set('name',rec.data.name);
        model.set('code',rec.data.code);
        model.set('parentId',rec.data.parentId);
        model.set('parentName',rec.data.parentName);
        model.modified = {};
        model.dirty = false;
        var win = Ext.create('Ext.Window', {
            width: 400,
            border: false,
            modal: true,
            iconCls: 'iconfont icon-edit',
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
                        if (resp != null && resp.success) {
                            kalix.core.Notify.success(resp.msg, CONFIG.ALTER_TITLE_SUCCESS);
                            var store = grid.getStore();
                            store.reload();
                        } else {
                            Ext.Msg.alert(CONFIG.ALTER_TITLE_FAILURE, resp.msg);
                        }
                    }
                });
            }
        });
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
                        //Ext.MessageBox.alert(CONFIG.ALTER_TITLE_INFO, resp.msg);
                        kalix.core.Notify.success(resp.msg, CONFIG.ALTER_TITLE_SUCCESS);
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
            border: false,
            modal: true,
            iconCls:'iconfont icon-add-user-column',
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
                            text: '保存', iconCls:'iconfont icon-save iconfont-btn-small', handler: function () {
                            me.onSaveAddUser(departmentUserUrl, this.up('#addUserForm'), rec);
                        }
                        },
                        {
                            text: '重置', iconCls:'iconfont icon-reset iconfont-btn-small', handler: function () {
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
    }
});