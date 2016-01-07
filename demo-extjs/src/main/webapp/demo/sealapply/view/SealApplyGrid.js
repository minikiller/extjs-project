/**
 * @author chenyanxu
 */
Ext.define('kalix.demo.sealApply.view.SealApplyGrid', {
    extend: 'kalix.view.components.common.BaseGrid',
    requires: [
        'kalix.demo.sealApply.controller.SealApplyGridController',
        'kalix.demo.sealApply.store.SealApplyStore',
        'kalix.admin.dict.component.DictGridColumn'
    ],
    alias: 'widget.sealApplyGrid',
    xtype: 'sealApplyGrid',
    controller: {
        type: 'sealApplyGridController',
        storeId: 'sealApplyStore',
        cfgForm: 'kalix.demo.sealApply.view.SealApplyWindow',
        cfgViewForm: 'kalix.demo.sealApply.view.SealApplyViewWindow',
        cfgModel: 'kalix.demo.sealApply.model.SealApplyModel'
    },
    store: {
        type: 'sealApplyStore'
    },
    columns: {
        defaults: {
            flex: 1,
            renderer: 'addTooltip'
        },
        items: [
            {
                xtype: "rownumberer",
                text: "行号",
                width: 50,
                flex: 0,
                align: 'center',
                renderer: null
            },
            {
                text: '编号',
                dataIndex: 'id',
                hidden: true
            },
            {
                text: '申请部门',
                dataIndex: 'department',
                flex: 0.5
            },
            {
                text: '申请时间',
                dataIndex: 'applyDate',
                xtype: 'datecolumn',
                flex: 0.5,
                format: 'Y-m-d',
                renderer: null
            },
            {
                text: '用印数',
                dataIndex: 'usageCount',
                flex: 0.5
            },
            {
                text: '印章类别',
                xtype: 'dictGridColumn',
                dictType: 'sealType',
                dataIndex: 'sealType',
                flex: 0.5,
                renderer: null
            },
            {
                text: '经办人',
                dataIndex: 'operator',
                flex: 0.5
            }
            ,
            {
                flex: 0.5,
                xtype: 'securityGridColumnCommon',
                items: [
                    {
                        icon: "resources/images/read.png",
                        permission: 'roffice:cmModule:contractMenu:view',
                        tooltip: '查看',
                        handler: 'onView'
                    }
                ]
            }
        ]
    },
    tbar: {
        xtype: 'securityToolbar',
        verifyItems: [
            {
                text: '添加',
                xtype: 'button',
                permission: '',
                bind: {icon: '{add_image_path}'},
                handler: 'onAdd'
            }
        ]
    }
});
