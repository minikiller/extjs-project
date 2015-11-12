/**
 * 功能编辑表单
 *
 * @author majian <br/>
 *         date:2015-7-21
 * @version 1.0.0
 */
Ext.define('kalix.admin.app.function.view.FunctionEditForm', {
    extend: 'Ext.FormPanel',
    requires: [
        'kalix.admin.app.function.viewModel.FunctionViewModel',
        'kalix.admin.app.function.controller.FunctionFormController'
    ],
    alias: 'widget.functionEditForm',
    viewModel: {
        type: 'functionViewModel'
    },
    controller: 'functionFormController',
    xtype: 'functionEditForm',
    labelAlign: 'center',
    labelWidth: 75,
    autoWidth: true,
    autoHeight: true,
    bodyStyle: "padding:15px",
    frame: true,
    jsonSubmit: true,
    method: "PUT",
    defaultType: 'textfield',
    buttonAlign: "center",
    items: [
        {xtype: 'hiddenfield', name: 'id'},
        {xtype: 'hiddenfield', name: 'isLeaf', value: '1'},
        {xtype: 'hiddenfield', name: 'applicationId', itemId: 'applicationIdId', value: '-1'},
        {
            fieldLabel: '所属应用',
            itemId: "applicationName",
            isFormField: false,
            disabled: true,
            beforeLabelTpl: [
                '<span style="color:red;font-weight:bold" data-qtip="必填选项">*</span>'
            ]
        },
        {
            fieldLabel: '上级功能',
            itemId: "parentName",
            isFormField: false,
            disabled: true,
            beforeLabelTpl: [
                '<span style="color:red;font-weight:bold" data-qtip="必填选项">*</span>'
            ]
        },
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
            fieldLabel: '功能代码',
            itemId: 'codeId',
            name: 'code',
            allowBlank: false,
            blankText: '功能代码不能为空!',
            beforeLabelTpl: [
                '<span style="color:red;font-weight:bold" data-qtip="必填选项">*</span>'
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
            text: '保存', glyph: 'xf0c7@FontAwesome', type: 'submit', handler: 'onUpdate'
        },
        {
            text: '重置', glyph: 'xf0e2@FontAwesome',handler: 'onEditReset'
        }
    ]
});