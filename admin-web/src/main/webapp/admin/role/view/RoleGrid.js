/**
 * 角色表格
 * @author majian <br/>
 *         date:2015-7-10
 * @version 1.0.0
 */
Ext.define('Kalix.admin.role.view.RoleGrid', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Kalix.admin.role.viewModel.RoleViewModel',
        'Kalix.admin.role.controller.RoleGridController'
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
            width: 60,
            xtype: "actioncolumn",
            items: [{
                icon: "resources/images/pencil.png",
                tooltip: '修改',
                handler: 'onEdit'
            }, {
                icon: "resources/images/cancel.png",
                tooltip: '删除',
                handler: 'onDelete'

            }]
        }
    ]

});