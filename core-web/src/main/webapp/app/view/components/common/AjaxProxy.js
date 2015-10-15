/**
 * Ajax代理
 *
 * @author majian <br/>
 *         date:2015-7-6
 * @version 1.0.0
 */
Ext.define('kalix.view.components.common.AjaxProxy', {
    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.ajaxProxyComponent',
    reader: {
        type: "json",
        rootProperty: "data",
        totalProperty: 'totalCount'
    }
});