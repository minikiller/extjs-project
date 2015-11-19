/**
 * 字典数据仓库
 *
 * @author majian <br/>
 *         date:2015-7-9
 * @version 1.0.0
 */
Ext.define('kalix.admin.dict.store.DictNoPageStore', {
    extend: 'kalix.store.BaseStore',
    model: 'kalix.admin.dict.model.DictModel',
    alias: 'store.dictNoPageStore',
    xtype: 'dictNoPageStore',
    storeId: "dictNoPageStore",
    pageSize:0,
    singleton: true,
    proxyUrl: '/kalix/camel/rest/dicts/list'
});