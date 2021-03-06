/**
 * @author chenyanxu
 */
Ext.define('kalix.controller.BaseGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.baseGridController',
    storeId: '',
    cfgForm: '',
    cfgViewForm: '',
    cfgModel: '',
    onView: function (grid, rowIndex, colIndex) {
        var viewModel = this.getViewModel();
        var selModel = grid.getStore().getData().items[rowIndex];
        var view = Ext.create(this.cfgViewForm);
        var vm = view.lookupViewModel();

        vm.set('rec', selModel);
        vm.set('iconCls', 'iconfont icon-view');
        vm.set('title', viewModel.get('view_title'));
        vm.set('view_operation', true);
        view.show();
        grid.setSelection(selModel);
    },
    itemdblclick: function (target, record, item, index, e, eOpts) {
        var grid = this.getView();
        var columns = grid.columns;
        var lastColumn = columns[columns.length - 1];

        if (lastColumn.text == '操作') {
            var items = lastColumn.items;

            for (var idx = 0; idx < items.length; ++idx) {
                var item = items[idx];

                if (item.handler == 'onView') {
                    if (item.hasPermission || item.permission == '') {
                        this.onView(grid, index, 0);
                    }
                    else {
                        Ext.Msg.alert(CONFIG.ALTER_TITLE_INFO, '无查看权限');
                    }

                    break;
                }
            }
        }
    },
    /**
     * 打开添加操作.
     */
    onAdd: function () {
        var grid = this.getView();
        var viewModel = this.getViewModel();
        var view = Ext.create(this.cfgForm);
        var vm = view.lookupViewModel();

        vm.set('rec', Ext.create(this.cfgModel));
        vm.set('iconCls', 'iconfont icon-add');
        vm.set('title', viewModel.get('add_title'));
        view.show();
    },
    /**
     * 打开编辑操作.
     * @param grid
     * @param rowIndex
     * @param colIndex
     */
    onEdit: function (grid, rowIndex, colIndex) {
        var viewModel = this.getViewModel();
        var selModel = grid.getStore().getData().items[rowIndex];
        var view = Ext.create(this.cfgForm);
        var vm = view.lookupViewModel();

        vm.set('rec', selModel);
        vm.set('iconCls', 'iconfont icon-edit');
        vm.set('title', viewModel.get('edit_title'));

        view.show();
        grid.setSelection(selModel);
    },
    onDelete: function (grid, rowIndex, colIndex) {
        var model = grid.getStore().getData().items[rowIndex];
        var store = Ext.app.Application.instance.getApplication().getStore(this.storeId);

        Ext.Msg.confirm("警告", "确定要删除吗？", function (button) {
            if (button == "yes") {
                store.proxy.extraParams = {};
                store.remove(model);
                store.sync(
                    {
                        callback: function (batch) {
                            store.currentPage = 1;
                            store.load();

                            var res = Ext.JSON.decode(batch.operations[0].getResponse().responseText);

                            if (batch.operations[0].success) {
                                kalix.core.Notify.success(res.msg, CONFIG.ALTER_TITLE_SUCCESS);
                            }
                            else {
                                Ext.Msg.alert(CONFIG.ALTER_TITLE_FAILURE, res.msg);
                            }
                        }
                    }
                );
            }
        });
    },
    onBatchDelete:function(){
        var grid = this.getView();
        var selModel = grid.getSelectionModel();
        var batchDeleteUrl = this.getViewModel().get("batchDeleteUrl");
        if (selModel.hasSelection()) {
            Ext.Msg.confirm("警告", "确定要删除吗？", function (button) {
                if (button == "yes") {
                    var rows = selModel.getSelected();
                    var ids = "";
                    for (var i = 0; i < rows.length; i++) {
                        var row = rows.getAt(i);
                        if (row != null && row.id != null) {
                            ids += row.id;
                            if (i + 1 != rows.length) {
                                ids += ":";
                            }
                        }
                    }
                    Ext.Ajax.request({
                        url: batchDeleteUrl + "?ids=" + ids,
                        method: 'DELETE',
                        callback: function (options, success, response) {
                            var resp = Ext.JSON.decode(response.responseText);
                            if (resp.success) {
                                kalix.core.Notify.success(resp.msg, CONFIG.ALTER_TITLE_SUCCESS);
                                var store = grid.getStore();
                                store.reload();
                            }
                            else{
                                kalix.core.Notify.alert(CONFIG.ALTER_TITLE_FAILURE, resp.msg);
                            }
                        }
                    });
                }
            });
        } else {
            Ext.Msg.show({
                title: '提示',
                message: '至少应该选择一条记录进行操作',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.WARNING,
                fn: null
            });
        }
    },
    //excel upload
    onChange: function (target, event, domValue) {
        var form = target.findParentByType('form');
        var store = this.getView().getStore();
        //var store = target.findParentByType('window').items.getAt(0).store;
        //var mainId = target.findParentByType('window').viewModel.get('rec').id

        scope = {store: store};

        form.submit({
            url: CONFIG.restRoot + '/camel/rest/excel/upload?' +
            'ConfigId=' + form.ConfigId +
            '&EntityName=' + form.EntityName +
            '&ServiceInterface=' + form.ServiceInterface,
            waitMsg: '正在上传...',
            scope: scope,
            success: function (fp, o) {
                store.currentPage = 1;
                store.load();
                kalix.core.Notify.success(o.result.msg, CONFIG.ALTER_TITLE_SUCCESS);
            },
            failure: function (fp, o) {
                Ext.Msg.alert(CONFIG.ALTER_TITLE_FAILURE, o.result.msg);
            }
        });
    },
    addTooltip: function (value, metadata, record, rowIndex, colIndex, store) {
        metadata.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    //金额格式化
    renderMoney: function (val, metadata, record, rowIndex, colIndex, store) {
        var out = Ext.util.Format.currency(val);
        out = out + '元';
        metadata.tdAttr = 'data-qtip="' + out + '"';
        return out;
    },
    //百分比格式化
    renderPercent: function (val, metadata, record, rowIndex, colIndex, store) {
        var percentage = (val * 100).toFixed(2)+'%';
        return percentage;
    },
    onAttachmentManage: function (grid, rowIndex, colIndex) {
        var view = Ext.create('kalix.attachment.view.AttachmentWindow');
        var selModel = grid.getStore().getData().items[rowIndex];
        var vm = view.lookupViewModel();

        vm.set('rec', selModel);
        view.show();
        grid.setSelection(selModel);
    }
});