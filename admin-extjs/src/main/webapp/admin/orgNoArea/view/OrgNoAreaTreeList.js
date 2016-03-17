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
        'kalix.admin.orgNoArea.controller.OrgNoAreaGridController',
        'kalix.admin.orgNoArea.store.OrgNoAreaStore'
    ],
    alias: 'widget.orgNoAreaTreeList',
    xtype: 'orgNoAreaTreeList',
    controller: 'orgNoAreaGridController',
    viewModel: {
        type: 'orgNoAreaViewModel'
    },
    store: {
        type: 'orgNoAreaStore',
        proxy:{
            type:'ajax',
            url: CONFIG.restRoot + '/camel/rest/orgs/'
        }
    },
    //store:'orgNoAreaStore',
    autoLoad:true,
    collapsible: true,
    autoScroll: true,
    rootVisible: false,
    title: '机构列表',
    iconCls: 'x-fa fa-building',
    tbar: [
        {
            tooltip: '刷新', icon: 'admin/resources/images/arrow_refresh.png',
            handler: 'onRefersh'
        },
        {
            tooltip: '展开', icon: 'admin/resources/images/arrow_down.png',
            handler: 'onOrgExpandAll'
        },
        {
            tooltip: '收起', icon: 'admin/resources/images/arrow_up.png',
            handler: 'onOrgCollapseAll'
        }]
});