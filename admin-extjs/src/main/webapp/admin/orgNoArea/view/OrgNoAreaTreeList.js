/**
 * 机构列表
 * @author zangyanming <br/>
 *         date:2016-3-10
 * @version 1.0.0
 */
Ext.define('kalix.admin.orgNoArea.view.OrgNoAreaTreeList', {
    extend: 'Ext.tree.Panel',
    requires: [
        'kalix.admin.orgNoArea.viewModel.OrgNoAreaViewModel',
        'kalix.admin.orgNoArea.controller.OrgNoAreaGridController'
    ],
    alias: 'widget.orgNoAreaTreeList',
    xtype: 'orgNoAreaTreeList',
    controller: 'orgNoAreaGridController',
    viewModel: {
        type: 'orgNoAreaViewModel'
    },
    autoLoad:true,
    constructor:function(){
        this.callParent(arguments);
        //this.store.on('load',function(target,records, successful, operation, eOpts){
        //    var indexId = 1;
        //    indexId = this.findParentByType('panel').indexId;
        //    if(indexId!=undefined)
        //        indexId = this.findParentByType('panel').indexId;
        //    else
        //        indexId = 1;
        //    var grid=this.findParentByType('panel').items.getAt(indexId).items.getAt(0);
        //    if(grid){
        //        grid.store.proxy.url = CONFIG.restRoot + '/camel/rest/deps/org/-1';
        //        grid.store.load();
        //    }
        //},this);
    },
    collapsible: true,
    autoScroll: true,
    rootVisible: false
});