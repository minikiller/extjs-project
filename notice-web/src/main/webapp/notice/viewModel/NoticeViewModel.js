/**
 * 用户视图模型
 *
 * @author majian <br/>
 *         date:2015-7-6
 * @version 1.0.0
 */
Ext.define('Kalix.notice.viewModel.NoticeViewModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'Kalix.notice.store.NoticeStore',
        'Kalix.notice.model.NoticeModel'
    ],
    alias: 'viewmodel.noticeViewModel',
    data: {
        addTitle: '新增公告',
        editTitle: '编辑公告',
        url: '/kalix/camel/rest/notices',
        currentNotice: null,
    },
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
    stores: {
        notices: {
            type: 'noticeStore'
        }
    }
});