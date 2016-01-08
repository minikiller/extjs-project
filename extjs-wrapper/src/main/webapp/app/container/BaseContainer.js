/**
 * @author chenyanxu
 */
Ext.define('kalix.container.BaseContainer', {
    extend: 'Ext.container.Container',
    storeId: '',
    listeners: {
        render: function (target, eOpts) {
            var store = Ext.app.Application.instance.getApplication().getStore(this.storeId);

            store.on('beforeload', function (store, opts, target) {
                if (target.items.getAt(0).xtype.search('Form') != -1) {
                    var jsonStr = Ext.JSON.encode(target.items.getAt(0).getForm().getFieldValues());

                    store.proxy.extraParams = {'jsonStr': jsonStr};
                }
            }, this, target);
        }
    }
});
