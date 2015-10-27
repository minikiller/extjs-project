/**
 * 角色新增表单
 *
 * @author majian <br/>
 *         date:2015-7-10
 * @version 1.0.0
 */
Ext.define('kalix.AdminApplication.Role.view.RoleAddForm', {
    extend: 'kalix.view.components.common.FormPanel',
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
    jsonSubmit: true,
    items: [
        {
            fieldLabel: '名称',
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
    ],

});