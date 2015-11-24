/**
 * 工作组表格
 * @author majian <br/>
 *         date:2015-7-10
 * @version 1.0.0
 */
Ext.define('kalix.admin.workgroup.view.WorkGroupGrid', {
    extend: 'Ext.grid.Panel',
    requires: [
        'kalix.admin.workgroup.viewModel.WorkGroupViewModel',
        'kalix.admin.workgroup.controller.WorkGroupGridController'
    ],
    alias: 'widget.workGroupGrid',
    xtype: 'workGroupGridPanel',
    controller: 'workGroupGridController',
    viewModel: {
        type: 'workGroupViewModel'
    },
    autoLoad: true,
    stripeRows: true,
    manageHeight: true,
    selModel: {selType: 'checkboxmodel', mode: "SIMPLE"},

    columns: [
        {
            xtype: "rownumberer",
            text: "行号",
            width: 50,
            align:'center'
        },
        {text: '编号', dataIndex: 'id',hidden:true},
        {text: '名称', dataIndex: 'name',flex:1},
        {text: '创建人', dataIndex: 'createBy',flex:2},
        {
            text: '创建日期', dataIndex: 'creationDate', renderer: function (value) {
            var createDate = new Date(value);
            return createDate.format("yyyy-MM-dd hh:mm:ss");
        }
        },
        {text: '更新人', dataIndex: 'updateBy',flex:2},
        {
            text: '更新日期', dataIndex: 'updateDate', renderer: function (value) {
            var updateDate = new Date(value);
            return updateDate.format("yyyy-MM-dd hh:mm:ss");
        }
        },
        {
            header: '操作',
            flex:1,
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

            }, {
                icon: "admin/resources/images/user_add.png",
                tooltip: '添加角色',
                handler: 'onAddRole'
            }]
        }
    ],
    tbar: [
        {
            text: '添加', icon: 'admin/resources/images/cup_add.png', handler: 'onAdd'
        }]

});