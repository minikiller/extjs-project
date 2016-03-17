/**
 * 部门模块控制器
 *
 * @author zangyanming <br/>
 *         date:2016-3-10
 * @version 1.0.0
 */
Ext.define('kalix.admin.dutyNoArea.controller.DutyNoAreaController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dutyNoAreaController',
    /**
     * 机构单击
     * @param view
     * @param record
     * @param item
     * @param index
     * @param e
     */
    onOrgClick: function (view, record, item, index, e) {
        var DepTreeList=view.findParentByType('panel').findParentByType('panel').items.getAt(1).items.getAt(0);
        var store = DepTreeList.getStore();
        store.setProxy({
            type: 'ajax',
            url: CONFIG.restRoot + '/camel/rest/deps/org/' + record.data.id
        });
        store.reload();

        var DutyTreeList=view.findParentByType('panel').findParentByType('panel').items.getAt(2).items.getAt(0);
        var store2 = DutyTreeList.getStore();
        store2.setProxy({
            type: 'ajax',
            url: CONFIG.restRoot + '/camel/rest/dutys/dep/-2'
        });
        store2.reload();
    },
    /**
     * 部门单击
     * @param view
     * @param record
     * @param item
     * @param index
     * @param e
     */
    onDepClick: function (view, record, item, index, e) {
        var DutyTreeList=view.findParentByType('panel').findParentByType('panel').items.getAt(2).items.getAt(0);
        var store = DutyTreeList.getStore();
        store.setProxy({
            type: 'ajax',
            url: CONFIG.restRoot + '/camel/rest/dutys/dep/' + record.data.id
        });
        store.reload();
    }
});