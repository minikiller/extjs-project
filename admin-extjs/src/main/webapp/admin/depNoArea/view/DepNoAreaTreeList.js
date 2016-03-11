/**
 * 部门列表
 * @author zangyanming <br/>
 *         date:2016-3-10
 * @version 1.0.0
 */
Ext.define('kalix.admin.depNoArea.view.DepNoAreaTreeList', {
    extend: 'Ext.tree.Panel',
    requires: [
        'kalix.admin.depNoArea.viewModel.DepNoAreaViewModel',
        'kalix.admin.depNoArea.controller.DepNoAreaGridController'
    ],
    alias: 'widget.depNoAreaTreeList',
    xtype: 'depNoAreaTreeList',
    controller: 'depNoAreaGridController',
    viewModel: {
        type: 'depNoAreaViewModel'
    },
    constructor:function(){
        this.callParent(arguments);
        this.store.on('load',function(target,records, successful, operation, eOpts){
            var grid=this.findParentByType('panel').items.getAt(1).items.getAt(0);
            if(grid){
                grid.store.proxy.url = CONFIG.restRoot + '/camel/rest/deps';
                grid.store.load();
            }
        },this);
    },
    collapsible: true,
    autoScroll: true,
    rootVisible: false
});