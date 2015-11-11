/**
 * 字典数据仓库
 *
 * @author majian <br/>
 *         date:2015-7-9
 * @version 1.0.0
 */
Ext.define('kalix.admin.dict.store.DictNoPageStore', {
    extend: 'Ext.data.Store',
    model: 'kalix.admin.dict.model.DictModel',
    alias: 'store.dictNoPageStore',
    xtype: 'dictNoPageStore',
    storeId: "dictNoPageStore",
    autoLoad: true,
    singleton: true,
    pageSize:0,
    proxy: {
        type: "ajax",
        url: '/kalix/camel/rest/dicts/list',
        reader: {
            type: "json"
        },
        noCache: false
    }
});