/**
 * 机构列表
 * @author majian <br/>
 *         date:2015-7-23
 * @version 1.0.0
 */
Ext.define('kalix.admin.org.view.OrgTreeList', {
    extend: 'Ext.tree.Panel',
    requires: [
        'kalix.admin.org.viewModel.OrgViewModel',
        'kalix.admin.org.controller.OrgGridController'
    ],
    alias: 'widget.orgTreeList',
    xtype: 'orgTreeList',
    controller: 'orgGridController',
    viewModel: {
        type: 'orgViewModel'
    },
    width: 200,
    collapsible: true,
    autoScroll: true,
    border: false,
    /*rootProperty:{
     id:'-1',
     name:'根机构'
     },*/
    rootVisible: false
});