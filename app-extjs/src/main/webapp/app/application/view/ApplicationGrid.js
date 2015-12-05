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
    autoLoad: false,
    stripeRows: true,
    manageHeight: true,
    selModel: {selType: 'checkboxmodel', mode: "SIMPLE"},
    constructor: function () {
        var scope = this;

        this.callParent(arguments);
        this.store.on('load', function (target, records, successful, eOpts) {
            var appIdArray = records.map(function (record) {
                return record.get('code');
            });
            var appIds = appIdArray.join('_');

            Ext.Ajax.request({
                url: '/kalix/camel/rest/osgi/bundle/status?appIds=' + appIds,
                scope: {view: this, appIdArray: appIdArray, records: records},
                success: function (response, opts) {
                    var obj = Ext.decode(response.responseText);

                    records.forEach(function (record) {
                        if (obj[record.get('code')]) {
                            record.set('status', true);
                        }
                        else {
                            record.set('status', false);
                        }
                    });
                },
                failure: function (response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });
        }, scope);
        this.store.load();
    },
    columns: [
        {
            xtype: "rownumberer",
            text: "行号",
            width: 50,
            align: 'center'
        },
        {text: '编号', dataIndex: 'id', hidden: true},
        {text: '名称', dataIndex: 'name', flex: 1},
        {text: '应用代码', dataIndex: 'code', flex: 1},
        {text: '路径', dataIndex: 'location', flex: 1},
        {text: '创建人', dataIndex: 'createBy', flex: 1},
        {
            text: '创建日期', dataIndex: 'creationDate', width: 120, renderer: function (value) {
            var createDate = new Date(value);
            return createDate.format("yyyy-MM-dd hh:mm:ss");
        }
        },
        {text: '更新人', dataIndex: 'updateBy', flex: 1},
        {
            text: '更新日期', dataIndex: 'updateDate', width: 120,
            renderer: function (value) {
                var updateDate = new Date(value);

                return updateDate.format("yyyy-MM-dd hh:mm:ss");
            }
        },
        {
            header: '操作',
            xtype: "actioncolumn",
            width: 100,
            items: [
                {
                    getClass: function (v, meta, record) {
                        if (record.data.status) {
                            return "kalix_stop";
                        }
                        return "kalix_start";
                    },
                    getTip: function (value, metadata, record, row, col, store) {
                        if (record.data.status) {
                            return "停止";
                        }
                        return '启动';
                    },
                    handler: 'onAppStartStop'
                },
                {
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
            text: '添加', icon: 'app/resources/images/application_add.png', handler: 'onAdd'
        }, "-",
        {
            text: '批量删除', icon: 'app/resources/images/application_delete.png', handler: 'onDeleteAll'
        }, "-"
    ]
});