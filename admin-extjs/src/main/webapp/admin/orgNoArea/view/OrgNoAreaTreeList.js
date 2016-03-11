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
    constructor:function(){
        this.callParent(arguments);
        this.store.on('load',function(target,records, successful, operation, eOpts){
            var grid=this.findParentByType('panel').items.getAt(1).items.getAt(0);
            if(grid){
                grid.store.proxy.url = CONFIG.restRoot + '/camel/rest/deps/org/-1';
                grid.store.load();
            }
        },this);
    },
    collapsible: true,
    autoScroll: true,
    rootVisible: false
});