/**
 * @author chenyanxu
 */
Ext.define('kalix.demo.mainWork.store.MainWorkStore', {
    extend: 'kalix.store.BaseStore',
    alias: 'store.mainWorkStore',
    model: 'kalix.demo.mainWork.model.MainWorkModel',
    xtype: 'mainWorkStore',
    storeId: 'mainWorkStore',
    proxyUrl: CONFIG.restRoot + '/camel/rest/workflows'
});