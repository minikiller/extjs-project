/**
 * 用户视图模型
 *
 * @author majian <br/>
 *         date:2015-7-6
 * @version 1.0.0
 */
Ext.define('kalix.demo.notice.viewModel.NoticeViewModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'kalix.demo.notice.store.NoticeStore',
        'kalix.demo.notice.model.NoticeModel'
    ],
    alias: 'viewmodel.noticeViewModel',
    data: {
        addTitle: '新增公告',
        editTitle: '编辑公告',
        url: CONFIG.restRoot + '/camel/rest/demos',
        processUrl: CONFIG.restRoot + '/camel/rest/demos',
        processShowTitile: '当前流程查看',
        processShowUrl: '/image'
    }
    /*formulas: {
     dirty: {
     bind: {
     bindTo: "{currentNotice}",
     deep: true
     },
     get: function(data) {
     console.log(data);
     return data ? data.dirty : false;
     }
     },
     storeDirty: {
     bind: {
     bindTo: "{currentNotice}",
     deep: true
     },
     get: function() {
     return this.getStore("notices").isDirty();
     }
     }
     },*/
    /*stores: {
     notices: {
     type: 'noticeStore'
     }
     }*/
});