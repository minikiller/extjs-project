/**
 * 机构数据仓库
 *
 * @author majian <br/>
 *         date:2015-7-21
 * @version 1.0.0
 */
Ext.define('Kalix.admin.org.store.OrgStore', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.orgStore',
    xtype: 'orgStore',
    storeId: "orgStore",
    model: "Kalix.admin.org.model.OrgModel",
    autoLoad: true,
    proxy: {
        type: "ajax",
        url: '/camel/rest/orgs'
    }
});