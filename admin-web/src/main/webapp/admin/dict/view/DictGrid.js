/**
 * 字典表格
 * @author majian <br/>
 *         date:2015-7-3
 * @version 1.0.0
 */
Ext.define('Kalix.admin.dict.view.DictGrid', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Kalix.admin.dict.viewModel.DictViewModel',
        'Kalix.admin.dict.controller.DictGridController'
    ],
    alias: 'widget.dictGrid',
    id: "dictDataGrid",
    xtype: 'dictGrid',
    controller: 'dictGridController',
    viewModel: {
        type: 'dictViewModel'
    },
    autoLoad: true,
    stripeRows: true,
    manageHeight: true,
    selModel: {selType: 'checkboxmodel', mode: "SIMPLE"},
    bind: {
        store: '{dictStore}'
    },
    bbar: [{
        xtype: 'pagingToolBarComponent',
        bind: {
            store: '{dictStore}'
        }
    }],
    columns: [
        {text: '编号', dataIndex: 'id'},
        {text: '标签名', dataIndex: 'label', width: 60},
        {text: '数据值', dataIndex: 'value', width: 60},
        {text: '类型', dataIndex: 'type', width: 60},
        {text: '排序', dataIndex: 'sort', width: 60},
        {text: '创建人', dataIndex: 'createBy', width: 60},
        {
            text: '创建日期', dataIndex: 'creationDate', width: 60, renderer: function (value) {
            var createDate = new Date(value);
            return createDate.format("yyyy-MM-dd hh:mm:ss");
        }
        },
        {text: '更新人', dataIndex: 'updateBy', width: 60},
        {
            text: '更新日期', dataIndex: 'updateDate', width: 60, renderer: function (value) {
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
                handler: 'onDelete',
                //glyph : 0xf059

            }]
        }
    ],
    tbar: [
        {
            text: '新增', icon: 'admin/resources/images/book_add.png', handler: 'onAdd'
        }, "-",
        {
            text: '批量删除', icon: 'admin/resources/images/book_delete.png', handler: 'onDeleteAll'
        }, "-"]

});