/**
 * 角色表格
 * @author majian <br/>
 *         date:2015-7-10
 * @version 1.0.0
 */
Ext.define('kalix.admin.role.view.RoleGrid', {
    extend: 'Ext.grid.Panel',
    requires: [
        'kalix.admin.role.viewModel.RoleViewModel',
        'kalix.admin.role.controller.RoleGridController'
    ],
    alias: 'widget.roleGrid',
    xtype: 'roleGridPanel',
    controller: 'roleGridController',
    viewModel: {
        type: 'roleViewModel'
    },
    autoLoad: true,
    stripeRows: true,
    manageHeight: true,
    //selModel: {selType: 'checkboxmodel', mode: "SIMPLE"},
    //bind: {
    //    store: '{roleStore}'
    //},
    //bbar: [{
    //    xtype: 'pagingToolBarComponent',
    //    bind: {
    //        store: '{roleStore}'
    //    }
    //}],
    columns: [
        {
            xtype: "rownumberer",
            text: "行号",
            width: 50,
            align: 'center'
        },
        {text: '编号', dataIndex: 'id', hidden: true},
        {text: '所属应用', dataIndex: 'app', flex: 1},
        {text: '名称', dataIndex: 'name', flex: 1},
        {text: '创建人', dataIndex: 'createBy', flex: 1},
        {
            text: '创建日期', dataIndex: 'creationDate', flex: 2, renderer: function (value) {
            var createDate = new Date(value);
            return createDate.format("yyyy-MM-dd hh:mm:ss");
        }
        },
        {text: '更新人', dataIndex: 'updateBy', flex: 1},
        {
            text: '更新日期', dataIndex: 'updateDate', flex: 2,
            renderer: function (value) {
            var updateDate = new Date(value);
            return updateDate.format("yyyy-MM-dd hh:mm:ss");
        }
        },
        {
            header: '操作',
            flex: 1,
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
                icon: "admin/resources/images/application_add.png",
                tooltip: '权限分配',
                handler: 'onAuthorization'
            }]
        }
    ],
    tbar: [
        {
            text: '添加', icon: 'admin/resources/images/user_add.png', handler: 'onAdd'
        }, "-",
        {
            text: '批量删除', icon: 'admin/resources/images/user_delete.png', handler: 'onDeleteAll'
        }, "-"
    ]

});