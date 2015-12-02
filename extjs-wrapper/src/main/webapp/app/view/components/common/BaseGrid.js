/**
 * @author chenyanxu
 */
Ext.define('kalix.view.components.common.BaseGrid', {
    extend: 'Ext.grid.Panel',
    requires: [
        'kalix.view.components.common.SecurityToolbar',
        'kalix.view.components.common.PagingToolBar',
        'kalix.view.components.common.SecurityGridColumnCommon',
        'kalix.view.components.common.SecurityGridColumnRUD'
    ],
    alias: 'widget.baseGrid',
    xtype: 'baseGrid',
    autoLoad: true,
    stripeRows: true,
    listeners: {
        itemdblclick: 'itemdblclick'
    },
    bbar: [{
        xtype: 'pagingToolBarComponent',
        border: false,
        padding: 0,
        listeners: {
            afterrender: function (c, obj) {
                var store=kalix.getApplication().getStore(this.lookupController().storeId);

                this.setConfig('store',store);
                this.items.getAt(0).setValue(store.pageSize);
            }
        }
    }
    ]
});
