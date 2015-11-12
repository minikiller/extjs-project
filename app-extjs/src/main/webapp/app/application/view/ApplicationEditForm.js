/**
 * 应用编辑表单
 *
 * @author majian <br/>
 *         date:2015-6-18
 * @version 1.0.0
 */
Ext.define('kalix.app.application.view.ApplicationEditForm', {
    extend: 'Ext.FormPanel',
    requires: [
        'kalix.app.application.viewModel.ApplicationViewModel',
        'kalix.app.application.controller.ApplicationFormController'
    ],
    alias: 'widget.applicationEditForm',
    viewModel: {
        type: 'applicationViewModel'
    },
    controller: 'applicationFormController',
    xtype: 'applicationEditForm',
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
            fieldLabel: '应用代码',
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
            text: '保存', glyph: 'xf0c7@FontAwesome', type: 'submit', handler: 'onUpdate'
        },
        {
            text: '重置', glyph: 'xf0e2@FontAwesome',handler: 'onEditReset'
        }
    ]
});