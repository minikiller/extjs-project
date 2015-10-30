/**
 * 字典数据仓库
 *
 * @author majian <br/>
 *         date:2015-7-9
 * @version 1.0.0
 */
Ext.define('kalix.admin.dict.store.DictStore', {
    extend: 'Ext.data.Store',
    model: 'kalix.admin.dict.model.DictModel',
    alias: 'store.dictStore',
    xtype: 'dictStore',
    storeId: "dictStore",
    autoLoad: true,
    pageSize: 10,
    proxy: {
        type: "ajax",
        url: '/kalix/camel/rest/dicts',
        reader: {
            type: "json",
            rootProperty: "data",
            totalProperty: 'totalCount'
        }
    }
});