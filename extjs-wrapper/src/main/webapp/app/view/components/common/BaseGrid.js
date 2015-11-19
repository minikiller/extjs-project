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
    bbar: [{
        xtype: 'pagingToolBarComponent',
        border: false,
        padding: 0,
        listeners: {
            afterrender: function (c, obj) {
                this.setConfig('store', kalix.getApplication().getStore(this.lookupController().storeId));
            }
        }
    }
    ]
});
