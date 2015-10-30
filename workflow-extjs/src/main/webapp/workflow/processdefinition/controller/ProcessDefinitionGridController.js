/**
 * 用户表格控制器
 *
 * @author majian <br/>
 *         date:2015-6-18
 * @version 1.0.0
 */
Ext.define('kalix.workflow.processdefinition.controller.ProcessDefinitionGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.processDefinitionGridController',


    /**
     * 打开新增操作.
     * @returns {Ext.panel.Panel}
     */
    onAdd: function () {
        var addFormPanel = Ext.create('kalix.notice.view.NoticeAddForm', {
            url: this.getView().getViewModel().get("url")
        });
        var win = Ext.create('Ext.Window', {
            width: 400,
            height: 350,
            border: false,
            modal: true,
            viewModel: {
                type: 'noticeViewModel'
            },
            //resizable:false,
            icon: 'admin/resources/images/group_add.png',
            bind: {
                title: '{addTitle}'
            },
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

        var sm = grid.getSelectionModel();
        var rec = grid.getStore().getAt(rowIndex)
        console.log(sm);
        console.log('fdfdfdf' + rec);

        /*var rec = grid.getStore().getAt(rowIndex);
         var editFormPanel = Ext.create('kalix.notice.view.NoticeEditForm', {
         url: this.getView().getViewModel().get("url")
         });
         var noticeModel = Ext.create("kalix.notice.model.NoticeModel", {
         id: rec.data.id,
         title: rec.data.title,
         content: rec.data.content,
         });*/
        //var grid = this.lookupReference('fooGrid');
        //this.setCurrentNotice(record);

        var editFormPanel = Ext.create('kalix.notice.view.NoticeEditForm', {
            url: this.getView().getViewModel().get("url"),
            //noticeRef:this.lookupReference('noticeRef'),
        });
        //editFormPanel.setCurrentNotice(rec.data);
        /* var sm = this.getSelectionModel();
         console.log(sm);
         ;*/
        editFormPanel.loadRecord(rec);

        var win = Ext.create('Ext.Window', {
            width: 400,
            height: 350,
            border: false,
            modal: true,
            viewModel: {
                type: 'noticeViewModel'
            },
            //resizable:false,
            icon: 'admin/resources/images/group_edit.png',
            bind: {
                title: '{editTitle}'
            },
            items: [editFormPanel]
        });
        //this.getView().getViewModel.set('rec',record);
        win.show();
    },
    /**
     * 批量删除操作.
     */
    onDeleteAll: function () {
        var selModel = Ext.getCmp("noticeDataGrid").getSelectionModel();
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
                        url: "/noticeDeleteAllServlet?ids=" + ids,
                        method: "GET",
                        callback: function (options, success, response) {
                            var resp = Ext.JSON.decode(response.responseText);
                            Ext.MessageBox.alert(CONFIG.ALTER_TITLE_INFO, resp.msg);
                            if (resp.success) {
                                var noticename = Ext.getCmp("noticename").getValue();
                                var name = Ext.getCmp("name").getValue();
                                var sex = Ext.getCmp("sex").getValue();
                                var status = Ext.getCmp("status").getValue();
                                var grid = Ext.getCmp("noticeDataGrid");
                                var store = grid.getStore();
                                store.reload({
                                    params: {
                                        start: 0,
                                        limit: pageSize,
                                        noticename: noticename,
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
                            var grid = Ext.getCmp("noticeDataGrid");
                            var store = grid.getStore();
                            store.reload();
                        }
                    }
                });
            }
        });
    },
    /**
     * 流程激活
     * @param grid
     * @param rowIndex
     * @param colIndex
     */
    onIsActivate: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var postUrl;
        if (rec.data.suspensionState == 1) {
            postUrl = this.getView().getViewModel().get("processUrl") + "/suspend?key=" + rec.data.key;
        } else {
            postUrl = this.getView().getViewModel().get("processUrl") + "/activate?key=" + rec.data.key;
        }
        Ext.Ajax.request({
            url: postUrl,
            method: 'GET',
            callback: function (options, success, response) {
                var resp = Ext.JSON.decode(response.responseText);
                Ext.MessageBox.alert(CONFIG.ALTER_TITLE_INFO, resp.msg);
                if (resp.success) {
                    var store = grid.getStore();
                    store.reload();
                }
            }
        });
    },
    /**
     * 查看流程定义
     * @param grid
     * @param rowIndex
     * @param colIndex
     */
    onOpenProcessDefinition: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var imgUrl = this.getView().getViewModel().get("processShowUrl") + "?processDefinitionId=" + rec.data.id;
        var win = Ext.create('kalix.workflow.processdefinition.components.ActivitiProcessImageWindow', {
            html: "<iframe  width='100%' height='100%' frameborder='0' src='" + imgUrl + "'></iframe>",
            title: this.getView().getViewModel().get("processShowTitile") + "-" + rec.data.name
        });
        win.show();
    }
});