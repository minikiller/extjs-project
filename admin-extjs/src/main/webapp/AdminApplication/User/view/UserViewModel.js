/**
 * 用户视图模型
 *
 * @author majian <br/>
 *         date:2015-7-6
 * @version 1.0.0
 */
Ext.define('kalix.AdminApplication.User.view.UserViewModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'kalix.AdminApplication.User.store.UserStore'
    ],
    alias: 'viewmodel.userViewModel',
    data: {
        addTitle: '新增用户',
        editTitle: '编辑用户',
        url: '/kalix/camel/rest/users'
    }
});