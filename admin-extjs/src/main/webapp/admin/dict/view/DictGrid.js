/**
 * 字典表格
 * @author majian <br/>
 *         date:2015-7-3
 * @version 1.0.0
 */
Ext.define('kalix.admin.dict.view.DictGrid', {
    extend: 'Ext.grid.Panel',
    requires: [
        'kalix.admin.dict.viewModel.DictViewModel',
        'kalix.admin.dict.controller.DictGridController'
    ],
    alias: 'widget.dictGrid',
    xtype: 'dictGridPanel',
    controller: 'dictGridController',
    viewModel: {
        type: 'dictViewModel'
    },
    autoLoad: true,
    stripeRows: true,
    manageHeight: true,
    //selModel: {selType: 'checkboxmodel', mode: "SIMPLE"},
    columns: [
        {
            xtype: "rownumberer",
            text: "行号",
            width: 50,
            align:'center'
        },
        {text: '编号', dataIndex: 'id',hidden:true},
        {text: '标签名', dataIndex: 'label', flex: 1},
        {text: '数据值', dataIndex: 'value', flex: 1},
        {text: '类型', dataIndex: 'type', flex: 1},
        {text: '排序', dataIndex: 'sort', flex: 1},
        {text: '创建人', dataIndex: 'createBy', flex: 1},
        {
            text: '创建日期', dataIndex: 'creationDate', flex: 1,
            renderer: function (value) {
                var createDate = new Date(value);
                return createDate.format("yyyy-MM-dd hh:mm:ss");
            }
        },
        {text: '更新人', dataIndex: 'updateBy', flex: 1},
        {
            text: '更新日期', dataIndex: 'updateDate', flex: 1,
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

            }]
        }
    ],
    tbar: [
        {
            text: '添加', icon: 'admin/resources/images/book_add.png', handler: 'onAdd'
        }, "-",
        {
            text: '批量删除', icon: 'admin/resources/images/book_delete.png', handler: 'onDeleteAll'
        }, "-"]

});