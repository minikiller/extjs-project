/**
 * 用户编辑表单
 *
 * @author majian <br/>
 *         date:2015-6-18
 * @version 1.0.0
 */
Ext.define('kalix.AdminApplication.User.view.UserEditForm', {
    extend: 'kalix.view.components.common.FormPanel',
    requires: [
        'kalix.AdminApplication.User.view.UserViewModel',
        'kalix.AdminApplication.User.controller.UserFormController'
    ],
    alias: 'widget.userEditForm',
    viewModel: {
        type: 'userViewModel'
    },
    controller: 'userFormController',
    xtype: 'userEditForm',
    jsonSubmit: true,
    items: [
        {
            fieldLabel: '登录名',
            itemId: 'loginNameId',
            name: 'loginName',
            allowBlank: false,
            blankText: '登录名不能为空!',
        },
        {
            fieldLabel: '姓名',
            itemId: 'nameId',
            name: 'name',
            allowBlank: false,
            blankText: '姓名不能为空!',
        },
        {
            inputType: 'password',
            fieldLabel: '密码',
            itemId: 'passwordId',
            name: 'password',
            allowBlank: false,
            blankText: '密码不能为空!',
        },
        {
            inputType: 'password',
            fieldLabel: '确认密码',
            isFormField: false,
            itemId: 'confirmPasswordId',
            allowBlank: false,
            blankText: '确认密码不能为空!',
        },
        {
            fieldLabel: '邮箱',
            itemId: 'emailId',
            name: 'email',
            allowBlank: false,
            blankText: '邮箱不能为空!',
        },
        {
            fieldLabel: '电话号',
            itemId: 'phoneId',
            name: 'phone',
        },
        {
            fieldLabel: '手机号',
            itemId: 'mobileId',
            name: 'mobile',
            allowBlank: false,
            blankText: '手机号不能为空!',
        },
        {
            xtype: 'combobox',
            fieldLabel: '状态',
            name: 'available',
            editable: false,
            value: '1',
            store: [
                ['1', '启用'],
                ['0', '停用']
            ],
        }
    ],
    buttons: [
        {
            text: '保存', glyph: 'xf0c7@FontAwesome',  type: 'submit', handler: 'onUpdate'
        },
        {
            text: '重置', glyph: 'xf0e2@FontAwesome', handler: 'onEditReset'
        }
    ]
});