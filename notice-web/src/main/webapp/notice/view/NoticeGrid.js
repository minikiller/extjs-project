/**
 * 用户表格
 * @author majian <br/>
 *         date:2015-7-3
 * @version 1.0.0
 */
Ext.define('Kalix.notice.view.NoticeGrid', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Kalix.notice.viewModel.NoticeViewModel',
        'Kalix.notice.controller.NoticeGridController'
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
    //publishes: ["currentNotice"],
    bind: {
        //autoLoad: true,
        store: '{notices}'
        //currentNotice: "{currentNotice}",
    },
    /* config: {
     currentNotice: null
     },*/

    bbar: [{
        xtype: 'pagingToolBarComponent',
        bind: {
            //autoLoad: true,
            store: '{notices}'
        }
    }],
    columns: [
        {text: '编号', dataIndex: 'id', width: 40},
        {text: '标题', dataIndex: 'title', width: 80},
        {text: '内容', dataIndex: 'content', width: 100},
        {text: '发布人', dataIndex: 'publishPeople', width: 60},
        {
            text: '创建日期', dataIndex: 'publishDate', width: 120, renderer: function (value) {
            var createDate = new Date(value);
            return createDate.format("yyyy-MM-dd hh:mm:ss");
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
            text: '新增', icon: 'admin/resources/images/group_add.png', handler: 'onAdd'
        }, "-",
        {
            text: '批量删除', icon: 'admin/resources/images/group_delete.png', handler: 'onDeleteAll'
        }, "-"],

});