/**
 * 机构表格
 * @author zangyanming <br/>
 *         date:2016-3-10
 * @version 1.0.0
 */
Ext.define('kalix.admin.orgNoArea.view.OrgNoAreaGrid', {
    extend: 'Ext.tree.Panel',
    requires: [
        'kalix.admin.orgNoArea.viewModel.OrgNoAreaViewModel',
        'kalix.admin.orgNoArea.controller.OrgNoAreaGridController'
    ],
    alias: 'widget.orgNoAreaGrid',
    xtype: 'orgNoAreaGridPanel',
    controller: 'orgNoAreaGridController',
    viewModel: {
        type: 'orgNoAreaViewModel'
    },
    autoLoad:true,
    stripeRows: true,
    manageHeight: true,
    rootVisible : false,
    title: '机构列表',
    iconCls: 'x-fa fa-building',
    columns: {
        defaults: {flex: 1},
        items:
        [{text: '编号', dataIndex: 'id',hidden:true },
        {text: '上级机构', dataIndex: 'parentName',hidden:true },
        {xtype : 'treecolumn', text: '名称',dataIndex: 'name'},
        {text: '机构代码', dataIndex: 'code'},
        {text: '创建人', dataIndex: 'createBy'},
        {
            text: '创建日期', dataIndex: 'creationDate'
        },
        {
            header: '操作',
            //width: 60,
            xtype: "actioncolumn",
            items: [{
                icon: "admin/resources/images/pencil.png",
                tooltip: '编辑',
                handler: 'onEdit',
                isDisabled: function(view, rowIdx, colIdx, item, record) {
                    return record.data.name=="根机构"?true:false;
                }
            }, {
                icon: "admin/resources/images/cancel.png",
                tooltip: '删除',
                handler: 'onDelete',
                isDisabled: function(view, rowIdx, colIdx, item, record) {
                    return record.data.name=="根机构"?true:false;
                }

            }]
        }
    ]},
    tbar: [
        {
            text: '添加', icon: 'admin/resources/images/script_add.png', handler: 'onAdd'
        }, {
            text: '刷新', icon: 'admin/resources/images/arrow_refresh.png', handler: 'onRefersh'
        }]

});