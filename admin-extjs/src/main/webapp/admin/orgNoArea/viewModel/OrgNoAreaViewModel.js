/**
 * 机构视图模型
 *
 * @author zangyanming <br/>
 *         date:2016-3-10
 * @version 1.0.0
 */
Ext.define('kalix.admin.orgNoArea.viewModel.OrgNoAreaViewModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'kalix.admin.orgNoArea.store.OrgNoAreaStore'
    ],
    alias: 'viewmodel.orgNoAreaViewModel',
    data: {
        addTitle: '新增机构',
        editTitle: '编辑机构',
        url: CONFIG.restRoot + '/camel/rest/orgs'
    }
});