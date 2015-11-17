/**
 * 用户表单控制器
 *
 * @author majian <br/>
 *         date:2015-6-18
 * @version 1.0.0
 */
Ext.define('kalix.controller.BaseFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.baseFormController',
    requires: ['kalix.core.Notify'],
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
        var storeId=this.storeId;

        if (model.isValid()) {
            model.modified = model.data;
            model.save({
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                    view.close();
                    model.dirty=false;
                    kalix.getApplication().getStore(storeId).reload();
                },
                callback: function (record, operation, success) {
                    var res = Ext.JSON.decode(operation.getResponse().responseText);

                    if (success) {
                        kalix.core.Notify.success(res.msg, CONFIG.ALTER_TITLE_SUCCESS);
                    }
                    else {
                        Ext.Msg.alert(CONFIG.ALTER_TITLE_FAILURE, res.msg);
                    }
                }
            });
        } else {
            viewModel.set('validation', _.pick(model.getValidation().data, function (value, key, object) {
                return value !== true;
            }));
        }
    },
    onDelete: function (grid, rowIndex, colIndex) {
        var storeId=this.storeId;
        var selModel=grid.getStore().getData().items[rowIndex];

        Ext.Msg.confirm("警告", "确定要删除吗？", function (button) {
            if (button == "yes") {
                selModel.erase({
                    failure: function (record, operation) {
                        // do something if the erase failed
                    },
                    success: function (record, operation) {
                        kalix.getApplication().getStore(storeId).reload();
                    },
                    callback: function (record, operation, success) {
                        var res = Ext.JSON.decode(operation.getResponse().responseText);

                        if (success) {
                            kalix.core.Notify.success(res.msg, CONFIG.ALTER_TITLE_SUCCESS);
                        }
                        else {
                            Ext.Msg.alert(CONFIG.ALTER_TITLE_FAILURE, res.msg);
                        }
                    }
                });
            }
        });

        grid.setSelection(null);
        viewModel.set('sel', false);
    },
    onClose: function (panel, eOpts) {
        var viewModel = this.getViewModel();
        var model = viewModel.get('rec');
        var storeId=this.storeId;

        if (model.dirty) {
            if (0 != model.get('id')) {
                Ext.Msg.confirm("警告", "要保存修改吗？", function (button) {
                    if (button == "yes") {
                        if (model.isValid()) {
                            model.modified = model.data;
                            model.save({
                                failure: function (record, operation) {
                                },
                                success: function (record, operation) {
                                    kalix.getApplication().getStore(storeId).reload();
                                },
                                callback: function (record, operation, success) {
                                    var res = Ext.JSON.decode(operation.getResponse().responseText);

                                    if (success) {
                                        kalix.core.Notify.success(res.msg, CONFIG.ALTER_TITLE_SUCCESS);
                                    }
                                    else {
                                        Ext.Msg.alert(CONFIG.ALTER_TITLE_FAILURE, res.msg);
                                    }
                                }
                            });
                        } else {
                            viewModel.set('validation', _.pick(model.getValidation().data, function (value, key, object) {
                                return value !== true;
                            }));
                        }
                    }
                    else{
                        model.set(model.modified);
                    }
                });
            }
        }
    }
});
