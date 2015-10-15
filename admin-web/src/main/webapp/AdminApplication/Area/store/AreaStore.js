/**
 * 区域数据仓库
 *
 * @author majian <br/>
 *         date:2015-7-24
 * @version 1.0.0
 */
Ext.define('kalix.AdminApplication.Area.store.AreaStore', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.areaStore',
    xtype: 'areaStore',
    storeId: "areaStore",
    model: "kalix.AdminApplication.Area.model.AreaModel",
    proxy: {
        type: "ajax",
        url: '/kalix/camel/rest/areas'
    }
});