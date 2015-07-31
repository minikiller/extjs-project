/**
 * 应用表格
 * @author majian <br/>
 *         date:2015-7-3
 * @version 1.0.0
 */
Ext.define('Kalix.app.application.view.ApplicationGrid', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Kalix.app.application.viewModel.ApplicationViewModel',
        'Kalix.app.application.controller.ApplicationGridController'
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
        {text: '编号', dataIndex: 'id', width: 40},
        {text: '名称', dataIndex: 'name', width: 80},
        {text: '应用代码', dataIndex: 'code', width: 60},
        {text: '路径', dataIndex: 'location', width: 60},
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
            xtype: "actioncolumn",
            width: 60,
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