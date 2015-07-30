/**
 * 应用新增表单
 *
 * @author majian <br/>
 *         date:2015-7-30
 * @version 1.0.0
 */
Ext.define('Kalix.app.application.view.ApplicationAddForm', {
    extend: 'Ext.FormPanel',
    requires: [
        'Kalix.app.application.viewModel.ApplicationViewModel',
        'Kalix.app.application.controller.ApplicationFormController'
    ],
    alias: 'widget.applicationAddForm',
    viewModel: {
        type: 'applicationViewModel'
    },
    controller: 'applicationFormController',
    xtype: "applicationAddForm",
    labelAlign: 'center',
    labelWidth: 75,
    autoWidth: true,
    autoHeight: true,
    jsonSubmit: true,
    bodyStyle: "padding:15px",
    frame: true,
    buttonAlign: "center",
    defaultType: 'textfield',
    items: [
        {
            fieldLabel: '名称',
            itemId: 'nameId',
            name: 'name',
            allowBlank: false,
            blankText: '名称不能为空!',
            beforeLabelTpl: [
                '<span style="color:red;font-weight:bold" data-qtip="必填选项">*</span>'
            ]
        },
        {
            fieldLabel: '代码',
            itemId: 'codeId',
            name: 'code',
            allowBlank: false,
            blankText: '代码不能为空!',
            beforeLabelTpl: [
                '<span style="color:red;font-weight:bold" data-qtip="必填选项">*</span>'
            ]
        },
        {
            fieldLabel: '路径',
            itemId: 'locationId',
            name: 'location',
            beforeLabelTpl: [
                '<span>&nbsp;&nbsp;</span>'
            ]
        },
        {
            xtype: 'textarea',
            fieldLabel: '备注',
            itemId: 'remarkId',
            name: 'remark',
            beforeLabelTpl: [
                '<span  >&nbsp;&nbsp;</span>'
            ]
        }
    ],
    buttons: [
        {
            text: '保存', glyph: 0xf0c7, type: 'submit', handler: 'onSave'
        },
        {
            text: '重置', glyph: 0xf0e2, handler: 'onAddReset'
        }
    ]
});