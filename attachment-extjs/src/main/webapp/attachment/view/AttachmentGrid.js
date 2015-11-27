/**
 * @author chenyanxu
 */
Ext.define('kalix.attachment.view.AttachmentGrid', {
    extend: 'kalix.view.components.common.BaseGrid',
    requires: [
        'kalix.attachment.controller.AttachmentGridController',
        'kalix.attachment.store.AttachmentStore'
    ],
    alias: 'widget.attachmentGrid',
    xtype: 'attachmentGrid',
    autoLoad: false,
    controller: {
        type: 'attachmentGridController',
        storeId: 'attachmentStore'
    },
    store: {
        type: 'attachmentStore'
    },
    columns: {
        defaults: {flex: 1},
        items: [
            {
                xtype: "rownumberer",
                text: "行号",
                width: 50,
                flex: 0,
                align: 'center'
            },
            {
                text: '编号',
                dataIndex: 'id',
                hidden: true
            },
            {
                text: '名称',
                dataIndex: 'attachmentName'
            },
            {
                text: '大小',
                dataIndex: 'attachmentType'
            },
            {
                text: '上传日期',
                dataIndex: 'uploadDate',
                xtype: 'datecolumn',
                format: 'Y-m-d'
            },
            {
                xtype: 'securityGridColumnCommon',
                items: [
                    {
                        icon: "resources/images/download.png",
                        permission: 'roffice:cmModule:contractMenu:delete',
                        tooltip: '下载',
                        handler: 'onDelete'
                    },
                    {
                        icon: "resources/images/delete.png",
                        permission: 'roffice:cmModule:contractMenu:delete',
                        tooltip: '删除',
                        handler: 'onDelete'
                    }
                ]
            }
        ]
    },
    tbar: {
        xtype: 'securityToolbar',
        verifyItems: [
            {
                text: '上传',
                xtype: 'filebutton',
                permission: 'roffice:cmModule:contractMenu:add',
                bind: {icon: '{add_image_path}'},
                //handler: 'onUpload',
                listeners: {
                    change: 'onChange'
                }
            }
        ]
    }
});
