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
            //viewModel.set('validation', _.pick(model.getValidation().data, function (value, key, object) {
            //    return value !== true;
            //}));
            var validation = _.pick(model.getValidation().data, function (value, key, object) {
                return value !== true;
            });

            var formItems = arguments[0].findParentByType('window').items;

            for (var formIndex = 0; formIndex < formItems.length; ++formIndex) {
                var fieldItems = formItems.getAt(formIndex).items;

                for (var fieldIndex = 0; fieldIndex < fieldItems.length; ++fieldIndex) {
                    var fieldItem = fieldItems.getAt(fieldIndex);
                    var bindPath = fieldItem.bind.value.stub.path;
                    var msg = validation[fieldItem.bind.value.stub.path.split('.')[1]];

                    if (msg != undefined) {
                        fieldItem.setActiveError(msg);
                    }
                }
            }
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
                        //viewModel.set('validation', _.pick(model.getValidation().data, function (value, key, object) {
                        //    return value !== true;
                        //}));
                        Ext.Msg.alert(CONFIG.ALTER_TITLE_FAILURE, "表单验证失败！");
                        model.set(model.modified);
                    }
                }
                else {
                    model.set(model.modified);
                }
            });
        }
    },
    onBeforerender: function (target, eOpts) {
        var formItems = target.items;
        var model = target.lookupViewModel().get('rec');

        for (var formIndex = 0; formIndex < formItems.length; ++formIndex) {
            var fieldItems = formItems.getAt(formIndex).items;

            for (var fieldIndex = 0; fieldIndex < fieldItems.length; ++fieldIndex) {
                var fieldItem = fieldItems.getAt(fieldIndex);

                if (fieldItem.config.bind != null) {
                        var instanceValidators = model.getField(fieldItem.config.bind.value.replace('}', '').split('.')[1]).instanceValidators;

                        if (instanceValidators != undefined && instanceValidators[0].type == 'presence') {
                            fieldItems.getAt(fieldIndex).beforeLabelTextTpl = '<span class="field-required" data-qtip="必填选项">*</span>'
                        }
                }
            }
        }
    }
});
