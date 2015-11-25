/**
 * @author chenyanxu
 */
Ext.define('kalix.controller.BaseWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.baseWindowController',
    requires: ['kalix.core.Notify'],
    storeId: '',
    /**
     * 重置操作.
     *
     */
    onReset: function () {
        var viewModel = this.getViewModel();
        var model = viewModel.get('rec');

        model.set(model.modified);
    },

    /**
     * 保存/更新操作.
     *
     */
    onSave: function () {
        var viewModel = this.getViewModel();
        var model = viewModel.get('rec');
        var view = this.getView();
        var store = kalix.getApplication().getStore(this.storeId);

        store.proxy.extraParams = {};

        if (model.isValid()) {

            if (!model.dirty) {
                Ext.Msg.alert(CONFIG.ALTER_TITLE_INFO, '未修改数据');
                return;
            }

            model.modified = model.data;

            if (0 == model.id) {
                store.add(model);
            }

            store.sync(
                {
                    success: function () {
                        view.close();
                        model.dirty = false;
                    },
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
        } else {
            viewModel.set('validation', _.pick(model.getValidation().data, function (value, key, object) {
                return value !== true;
            }));
        }
    },
    onClose: function (panel, eOpts) {
        var viewModel = this.getViewModel();
        var model = viewModel.get('rec');

        if (model == null) {
            return;
        }

        if (model.dirty) {
            var store = kalix.getApplication().getStore(this.storeId);

            Ext.Msg.confirm("警告", "要保存修改吗？", function (button) {
                if (button == "yes") {
                    if (model.isValid()) {
                        model.modified = model.data;

                        if (0 == model.id) {
                            store.add(model);
                        }

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
                    } else {
                        viewModel.set('validation', _.pick(model.getValidation().data, function (value, key, object) {
                            return value !== true;
                        }));
                    }
                }
                else {
                    model.set(model.modified);
                }
            });
        }
    }
});
