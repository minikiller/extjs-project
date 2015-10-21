/**
 * 功能数据仓库
 *
 * @author majian <br/>
 *         date:2015-7-31
 * @version 1.0.0
 */
Ext.define('Kalix.app.function.store.FunctionStore', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.functionStore',
    xtype: 'functionStore',
    storeId: "functionStore",
    model: "Kalix.app.function.model.FunctionModel"
});