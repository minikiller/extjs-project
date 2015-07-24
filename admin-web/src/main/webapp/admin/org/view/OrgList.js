/**
 * 机构列表
 * @author majian <br/>
 *         date:2015-7-23
 * @version 1.0.0
 */
Ext.define('Kalix.admin.org.view.OrgList', {
    extend: 'Ext.tree.Panel',
    requires: [
        'Kalix.admin.org.viewModel.OrgViewModel',
        'Kalix.admin.org.controller.OrgGridController'
    ],
    alias: 'widget.orgList',
    xtype: 'orgList',
    controller: 'orgGridController',
    viewModel: {
        type: 'orgViewModel'
    },
    width: 200,
    collapsible: true,
    autoScroll: true,
    border: false,
    /*root:{
     id:'-1',
     name:'根机构'
     },*/
    rootVisible: false
});