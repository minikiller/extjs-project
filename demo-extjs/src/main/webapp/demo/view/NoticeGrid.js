/**
 * 用户表格
 * @author majian <br/>
 *         date:2015-7-3
 * @version 1.0.0
 */
Ext.define('kalix.demo.view.NoticeGrid', {
    extend: 'Ext.grid.Panel',
    requires: [
        'kalix.demo.viewModel.NoticeViewModel',
        'kalix.demo.controller.NoticeGridController'
    ],
    alias: 'widget.noticeGrid',
    xtype: 'noticeGrid',
    controller: 'noticeGridController',
    viewModel: {
        type: 'noticeViewModel'
    },
    autoLoad: true,
    stripeRows: true,
    manageHeight: true,
    selModel: {selType: 'checkboxmodel', mode: "SIMPLE"},
    columns: [
        {text: '编号', dataIndex: 'id', width: 40},
        {text: '标题', dataIndex: 'title', width: 80},
        {text: '内容', dataIndex: 'content', width: 100},
        {text: '发布人', dataIndex: 'publishPeople', width: 60},
        {text: '工作流状态', dataIndex: 'status', width: 60},
        {text: '当前环节', dataIndex: 'currentNode', width: 60},
        {
            text: '创建日期', dataIndex: 'creationDate', width: 120, renderer: function (value) {
            var createDate = new Date(value);
            return createDate.format("yyyy-MM-dd hh:mm:ss");
        }
        },
        {
            header: '操作',
            xtype: "actioncolumn",
            width: 80,
            items: [{
                icon: "resources/images/pencil.png",
                tooltip: '修改',
                handler: 'onEdit'
            }, {
                icon: "resources/images/cancel.png",
                tooltip: '删除',
                handler: 'onDelete'

            }, {
                itemId: 'activateButton',
                getClass: function (v, meta, record) {
                    return "kalix_start";
                },
                getTip: function (value, metadata, record, row, col, store) {
                    return '启动';
                },
                handler: 'onIsStart'
            }, {
                icon: "resources/images/magnifier.png",
                tooltip: '查看',
                handler: 'onOpenCurrentProcess'
            }]
        }
    ],
    tbar: [
        {
            text: '新增', icon: 'admin/resources/images/group_add.png', handler: 'onAdd'
        }, "-",
        {
            text: '批量删除', icon: 'admin/resources/images/group_delete.png', handler: 'onDeleteAll'
        }, "-"]

});