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
    autoLoad:false,
    collapsible: true,
    autoScroll: true,
    rootVisible: false,

    store: Ext.create('kalix.admin.depNoArea.store.DepNoAreaStore'),
    title: '部门列表',
    iconCls: 'x-fa fa-building',
    tbar: [
        {
            tooltip: '刷新', icon: 'admin/resources/images/arrow_refresh.png',
            handler: 'onRefersh'
        },
        {
            tooltip: '展开', icon: 'admin/resources/images/arrow_down.png',
            handler: 'onExpandAll'
        },
        {
            tooltip: '收起', icon: 'admin/resources/images/arrow_up.png',
            handler: 'onCollapseAll'
        }]
});