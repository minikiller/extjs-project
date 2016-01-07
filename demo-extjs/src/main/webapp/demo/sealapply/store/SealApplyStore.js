/**
 * @author chenyanxu
 */
Ext.define('kalix.demo.sealApply.store.SealApplyStore', {
    extend: 'kalix.store.BaseStore',
    alias: 'store.sealApplyStore',
    model: 'kalix.demo.sealApply.model.SealApplyModel',
    xtype: 'sealApplyStore',
    storeId: 'sealApplyStore',
    proxyUrl: CONFIG.restRoot + '/camel/rest/sealapplys'
});