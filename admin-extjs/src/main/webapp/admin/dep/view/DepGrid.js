/**
 * 部门表格
 * @author majian <br/>
 *         date:2015-7-23
 * @version 1.0.0
 */
Ext.define('Kalix.admin.dep.view.DepGrid', {
    extend: 'Ext.tree.Panel',
    requires: [
        'Kalix.admin.dep.viewModel.DepViewModel',
        'Kalix.admin.dep.controller.DepGridController'
    ],
    alias: 'widget.depGrid',
    xtype: 'depGridPanel',
    controller: 'depGridController',
    viewModel: {
        type: 'depViewModel'
    },
    data:{
        orgId:null,
        orgName: null,
        areaName: null
    },
    region: "center",
    title:'部门列表',
    columnLines : true,
    stripeRows: true,
    /*rootProperty:{
        id:'-1',
        name:'根机构'
    },*/
    manageHeight: true,
    rootVisible : false,
    columns: [
        {text: '编号', dataIndex: 'id',hidden:true },
        {text: '上级部门', dataIndex: 'parentName',hidden:true },
        {xtype : 'treecolumn', text: '名称',dataIndex: 'name', width: 255},
        {text: '部门代码', dataIndex: 'code', width: 60},
        {text: '中心代码', dataIndex: 'centerCode', width: 60},
        {text: '创建人', dataIndex: 'createBy', width: 60},
        {
            text: '创建日期', dataIndex: 'creationDate', width: 160, renderer: function (value) {
            var createDate = new Date(value);
            return createDate.format("yyyy-MM-dd hh:mm:ss");
        }
        },
        {text: '更新人', dataIndex: 'updateBy', width: 60},
        {
            text: '更新日期', dataIndex: 'updateDate', width: 160, renderer: function (value) {
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
                handler: 'onEdit',
                isDisabled: function(view, rowIdx, colIdx, item, record) {
                    return record.data.name=="根部门"?true:false;
                }
            }, {
                icon: "resources/images/cancel.png",
                tooltip: '删除',
                handler: 'onDelete',
                isDisabled: function(view, rowIdx, colIdx, item, record) {
                    return record.data.name=="根机构"?true:false;
                }

            }, {
                icon: "admin/resources/images/group_add.png",
                tooltip: '添加用户',
                handler: 'onAddUser'
            }]
        }
    ],
    tbar: [
        {
            text: '新增', icon: 'admin/resources/images/building_add.png', handler: 'onAdd'
        }, {
            text: '刷新', icon: 'admin/resources/images/arrow_refresh.png', handler: 'onRefersh'
        }]

});