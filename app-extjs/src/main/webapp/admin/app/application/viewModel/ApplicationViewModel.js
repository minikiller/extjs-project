/**
 * 应用视图模型
 *
 * @author majian <br/>
 *         date:2015-7-6
 * @version 1.0.0
 */
Ext.define('kalix.admin.app.application.viewModel.ApplicationViewModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'kalix.admin.app.application.store.ApplicationStore'
    ],
    alias: 'viewmodel.applicationViewModel',
    data: {
        addTitle: '新增应用',
        editTitle: '编辑应用',
        url: '/kalix/camel/rest/applications'
    }
});