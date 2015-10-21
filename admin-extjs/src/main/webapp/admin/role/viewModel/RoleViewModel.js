/**
 * 角色视图模型
 *
 * @author majian <br/>
 *         date:2015-7-10
 * @version 1.0.0
 */
Ext.define('Kalix.admin.role.viewModel.RoleViewModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'Kalix.admin.role.store.RoleStore'
    ],
    alias: 'viewmodel.roleViewModel',
    data: {
        addTitle: '新增角色',
        editTitle: '编辑角色',
        url: '/kalix/camel/rest/roles',
        authorizationUrl: '/kalix/camel/rest/roles/authorizations'
    }
    //stores: {
    //    roleStore: {
    //        type: 'roleStore'
    //    }
    //}
});