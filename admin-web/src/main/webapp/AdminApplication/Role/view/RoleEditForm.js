/**
 * 角色编辑表单
 *
 * @author majian <br/>
 *         date:2015-7-10
 * @version 1.0.0
 */
Ext.define('kalix.AdminApplication.Role.view.RoleEditForm', {
    extend: 'Ext.FormPanel',
    requires: [
        'kalix.AdminApplication.Role.view.RoleViewModel',
        'kalix.AdminApplication.Role.controller.RoleFormController'
    ],
    alias: 'widget.roleEditForm',
    viewModel: {
        type: 'roleViewModel'
    },
    controller: 'roleFormController',
    xtype: 'roleEditForm',
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
            text: '保存', type: 'submit', handler: 'onUpdate'
        },
        {
            text: '重置', handler: 'onEditReset'
        }
    ]
});