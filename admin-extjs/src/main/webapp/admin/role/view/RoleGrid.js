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
    selModel: {selType: 'checkboxmodel', mode: "SIMPLE"},
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
        {text: '编号', dataIndex: 'id'},
        {text: '名称', dataIndex: 'name', width: 120},
        {text: '创建人', dataIndex: 'createBy', width: 60},
        {
            text: '创建日期', dataIndex: 'creationDate', width: 120, renderer: function (value) {
            var createDate = new Date(value);
            return createDate.format("yyyy-MM-dd hh:mm:ss");
        }
        },
        {text: '更新人', dataIndex: 'updateBy', width: 60},
        {
            text: '更新日期', dataIndex: 'updateDate', width: 120, renderer: function (value) {
            var updateDate = new Date(value);
            return updateDate.format("yyyy-MM-dd hh:mm:ss");
          }
        },
        {
            header: '操作',
            width: 75,
            xtype: "actioncolumn",
            items: [{
                icon: "admin/resources/images/pencil.png",
                tooltip: '修改',
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
            text: '新增', icon: 'admin/resources/images/user_add.png', handler: 'onAdd'
        }, "-",
        {
            text: '批量删除', icon: 'admin/resources/images/user_delete.png', handler: 'onDeleteAll'
        }, "-"
    ]

});