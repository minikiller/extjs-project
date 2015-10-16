/**
 * 角色新增表单
 *
 * @author majian <br/>
 *         date:2015-7-10
 * @version 1.0.0
 */
Ext.define('kalix.AdminApplication.Role.view.RoleAddForm', {
    extend: 'Ext.FormPanel',
    requires: [
        'kalix.AdminApplication.Role.view.RoleViewModel',
        'kalix.AdminApplication.Role.controller.RoleFormController'
    ],
    alias: 'widget.roleAddForm',
    viewModel: {
        type: 'roleViewModel'
    },
    controller: 'roleFormController',
    xtype: "roleAddFormPanel",
    layout:'form',
    //width: 400,
    bodyPadding: 10,
    labelAlign: 'top',
    labelWidth: 75,
    /*autoWidth: true,
    autoHeight: true,*/
    jsonSubmit: true,
    //bodyStyle: "padding:15px",
    frame: true,
    buttonAlign: "center",
    defaultType: 'textfield',
    items: [
        {
            fieldLabel: '<span style="color:red;font-weight:bold" data-qtip="必填选项">*</span>名称',
            itemId: 'nameId',
            name: 'name',
            allowBlank: false,
            blankText: '名称不能为空!'
        },
        {
            xtype: 'textarea',
            fieldLabel: '备注',
            itemId: 'remarkId',
            name: 'remark'//,
            /*beforeLabelTpl: [
                '<span  >&nbsp;&nbsp;</span>'
            ]*/
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