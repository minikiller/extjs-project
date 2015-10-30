/**
 * 角色新增表单
 *
 * @author majian <br/>
 *         date:2015-7-10
 * @version 1.0.0
 */
Ext.define('kalix.admin.role.view.RoleAddForm', {
    extend: 'Ext.FormPanel',
    requires: [
        'kalix.admin.role.viewModel.RoleViewModel',
        'kalix.admin.role.controller.RoleFormController'
    ],
    alias: 'widget.roleAddForm',
    viewModel: {
        type: 'roleViewModel'
    },
    controller: 'roleFormController',
    xtype: "roleAddFormPanel",
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
            text: '保存', glyph: 'xf0c7@FontAwesome', type: 'submit', handler: 'onSave'
        },
        {
            text: '重置', glyph: 'xf0e2@FontAwesome', handler: 'onAddReset'
        }
    ]
});