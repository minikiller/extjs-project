/**
 * 工作组视图模型
 *
 * @author majian <br/>
 *         date:2015-7-24
 * @version 1.0.0
 */
Ext.define('Kalix.admin.workGroup.viewModel.WorkGroupViewModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'Kalix.admin.workGroup.store.WorkGroupStore'
    ],
    alias: 'viewmodel.workGroupViewModel',
    data: {
        addTitle: '新增工作组',
        editTitle: '编辑工作组',
        url: '/kalix/camel/rest/workGroups'
    }
});