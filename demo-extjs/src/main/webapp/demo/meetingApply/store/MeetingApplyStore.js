/**
 * @author zangyanming
 */
Ext.define('kalix.demo.meetingApply.store.MeetingApplyStore', {
    extend: 'kalix.store.BaseStore',
    alias: 'store.meetingApplyStore',
    model: 'kalix.demo.meetingApply.model.MeetingApplyModel',
    xtype: 'meetingApplyStore',
    storeId: 'meetingApplyStore',
    proxyUrl: CONFIG.restRoot + '/camel/rest/meetingapplys'
});