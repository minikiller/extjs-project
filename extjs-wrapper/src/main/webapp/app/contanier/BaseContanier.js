/**
 */
Ext.define('kalix.contanier.BaseContanier', {
    extend: 'Ext.container.Container',
    storeId: '',
    listeners: {
        render: function (target, eOpts) {
            var store = kalix.getApplication().getStore(this.storeId);

            store.on('beforeload', function (store, opts, target) {
                var jsonStr = Ext.JSON.encode(target.items.getAt(0).getForm().getFieldValues());
                store.proxy.extraParams = {'jsonStr': jsonStr};
            }, this, target);
        }
    }
});
