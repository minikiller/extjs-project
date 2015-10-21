/**
 * 用户视图模型
 *
 * @author majian <br/>
 *         date:2015-7-6
 * @version 1.0.0
 */
Ext.define('Kalix.admin.user.viewModel.UserViewModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'Kalix.admin.user.store.UserStore'
    ],
    alias: 'viewmodel.userViewModel',
    data: {
        addTitle: '新增用户',
        editTitle: '编辑用户',
        url: '/kalix/camel/rest/users'
    }
});