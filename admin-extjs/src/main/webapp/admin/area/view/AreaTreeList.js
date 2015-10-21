/**
 * 区域列表
 * @author majian <br/>
 *         date:2015-7-23
 * @version 1.0.0
 */
Ext.define('Kalix.admin.area.view.AreaTreeList', {
    extend: 'Ext.tree.Panel',
    requires: [
        'Kalix.admin.area.viewModel.AreaViewModel',
        'Kalix.admin.area.controller.AreaGridController'
    ],
    alias: 'widget.areaTreeList',
    xtype: 'areaTreeList',
    controller: 'orgGridController',
    viewModel: {
        type: 'orgViewModel'
    },
    width: 200,
    collapsible: true,
    autoScroll: true,
    border: true,
    /*rootProperty:{
     id:'-1',
     name:'根机构'
     },*/
    rootVisible: false
});