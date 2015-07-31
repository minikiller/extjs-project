/**
 * 功能视图模型
 *
 * @author majian <br/>
 *         date:2015-7-21
 * @version 1.0.0
 */
Ext.define('Kalix.app.function.viewModel.FunctionViewModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'Kalix.app.function.store.FunctionStore'
    ],
    alias: 'viewmodel.functionViewModel',
    data: {
        addTitle: '新增机构',
        editTitle: '编辑机构',
        url: '/kalix/camel/rest/functions'
    }
});