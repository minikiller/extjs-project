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
        vm.set('icon', viewModel.get('view_image_path'));
        vm.set('title', viewModel.get('view_title'));
        vm.set('view_operation', true);
        view.show();
        grid.setSelection(selModel);
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
        vm.set('icon', viewModel.get('add_image_path'));
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
        vm.set('icon', viewModel.get('edit_image_path'));
        vm.set('title', viewModel.get('edit_title'));
        view.show();
        grid.setSelection(selModel);
    },
    onDelete: function (grid, rowIndex, colIndex) {
        var model = grid.getStore().getData().items[rowIndex];
        var store = kalix.getApplication().getStore(this.storeId);

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

    addTooltip: function (value, metadata, record, rowIndex, colIndex, store) {
        metadata.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },

    renderMoney: function (val, metadata, record, rowIndex, colIndex, store) {
        var out = Ext.util.Format.currency(val);
        out = out + '元';
        metadata.tdAttr = 'data-qtip="' + out + '"';
        return out;
    }
});