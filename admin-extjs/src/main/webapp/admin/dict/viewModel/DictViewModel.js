/**
 * 字典视图模型
 *
 * @author majian <br/>
 *         date:2015-7-9
 * @version 1.0.0
 */
Ext.define('kalix.admin.dict.viewModel.DictViewModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'kalix.admin.dict.store.DictStore'
    ],
    alias: 'viewmodel.dictViewModel',
    data: {
        addTitle: '新增字典',
        editTitle: '编辑字典',
        url: '/kalix/camel/rest/dicts'
    }
});