/**
 * @author chenyanxu
 */
Ext.define('kalix.demo.carApply.store.CarApplyStore', {
    extend: 'kalix.store.BaseStore',
    alias: 'store.carApplyStore',
    model: 'kalix.demo.carApply.model.CarApplyModel',
    xtype: 'carApplyStore',
    storeId: 'carApplyStore',
    proxyUrl: CONFIG.restRoot + '/camel/rest/carapplys'
});