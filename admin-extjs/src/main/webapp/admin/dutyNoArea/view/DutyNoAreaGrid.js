/**
 * 部门表格
 * @author zangyanming <br/>
 *         date:2016-3-10
 * @version 1.0.0
 */
Ext.define('kalix.admin.dutyNoArea.view.DutyNoAreaGrid', {
    extend: 'Ext.tree.Panel',
    requires: [
        'kalix.admin.dutyNoArea.viewModel.DutyNoAreaViewModel',
        'kalix.admin.dutyNoArea.controller.DutyNoAreaGridController'
    ],
    alias: 'widget.dutyNoAreaGrid',
    xtype: 'dutyNoAreaGridPanel',
    controller: 'dutyNoAreaGridController',
    viewModel: {
        type: 'dutyNoAreaViewModel'
    },
    title: '职位列表',
    iconCls: 'x-fa fa-university',
    stripeRows: true,
    manageHeight: true,
    rootVisible: false,
    defaults: {
        flex: 1
    },
    columns: {
        defaults: {flex: 1},
        items:[
        {text: '编号', dataIndex: 'id'},
        {text: '职位名称', dataIndex: 'name'},
        {text: '职位描述', dataIndex: 'comment'},
        {text: '所属部门', dataIndex: 'depid'},
        {text: '创建人', dataIndex: 'createBy'},
        {
            text: '创建日期', dataIndex: 'creationDate'
        },
        {
            header: '操作',
            xtype: "actioncolumn",
            items: [{
                icon: "admin/resources/images/pencil.png",
                tooltip: '编辑',
                handler: 'onEdit'
            }, {
                icon: "admin/resources/images/cancel.png",
                tooltip: '删除',
                handler: 'onDelete'
            }, {
                icon: "admin/resources/images/group_add.png",
                tooltip: '添加用户',
                handler: 'onAddUser'
            }]
        }
    ]},
    tbar: [
        {
            text: '添加', icon: 'admin/resources/images/building_add.png', handler: 'onAdd'
        }, {
            text: '刷新', icon: 'admin/resources/images/arrow_refresh.png', handler: 'onRefersh'
        }]

});