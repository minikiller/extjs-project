/**
 * @author chenyanxu
 */
Ext.define('kalix.demo.recruitApply.store.RecruitApplyStore', {
    extend: 'kalix.store.BaseStore',
    alias: 'store.recruitApplyStore',
    model: 'kalix.demo.recruitApply.model.RecruitApplyModel',
    xtype: 'recruitApplyStore',
    storeId: 'recruitApplyStore',
    proxyUrl: CONFIG.restRoot + '/camel/rest/recruitapplys'
});