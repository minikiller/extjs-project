/**
 * 应用表格
 * @author majian <br/>
 *         date:2015-7-3
 * @version 1.0.0
 */
Ext.define('kalix.app.application.view.ApplicationGrid', {
    extend: 'Ext.grid.Panel',
    requires: [
        'kalix.app.application.viewModel.ApplicationViewModel',
        'kalix.app.application.controller.ApplicationGridController'
    ],
    alias: 'widget.applicationGrid',
    xtype: 'applicationGridPanel',
    controller: 'applicationGridController',
    viewModel: {
        type: 'applicationViewModel'
    },
    autoLoad: true,
    stripeRows: true,
    manageHeight: true,
    selModel: {selType: 'checkboxmodel', mode: "SIMPLE"},
    columns: [
        {text: '编号', dataIndex: 'id', flex:1},
        {text: '名称', dataIndex: 'name', flex:1},
        {text: '应用代码', dataIndex: 'code', flex:1},
        {text: '路径', dataIndex: 'location', flex:1},
        {text: '创建人', dataIndex: 'createBy', flex:1},
        {
            text: '创建日期', dataIndex: 'creationDate', width: 120, renderer: function (value) {
            var createDate = new Date(value);
            return createDate.format("yyyy-MM-dd hh:mm:ss");
        }
        },
        {text: '更新人', dataIndex: 'updateBy', flex:1},
        {
            text: '更新日期', dataIndex: 'updateDate', width: 120, renderer: function (value) {
            var updateDate = new Date(value);
            return updateDate.format("yyyy-MM-dd hh:mm:ss");
        }
        },
        {
            header: '操作',
            xtype: "actioncolumn",
            width: 60,
            items: [{
                icon: "admin/resources/images/pencil.png",
                tooltip: '修改',
                handler: 'onEdit'
            }, {
                icon: "admin/resources/images/cancel.png",
                tooltip: '删除',
                handler: 'onDelete'

            }]
        }
    ],
    tbar: [
        {
            text: '新增', icon: 'app/resources/images/application_add.png', handler: 'onAdd'
        }, "-",
        {
            text: '批量删除', icon: 'app/resources/images/application_delete.png', handler: 'onDeleteAll'
        }, "-"
    ]
});