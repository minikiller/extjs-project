/**
 * 用户编辑表单
 *
 * @author majian <br/>
 *         date:2015-6-18
 * @version 1.0.0
 */
Ext.define('Kalix.admin.user.view.UserEditForm', {
    extend: 'Ext.FormPanel',
    requires: [
        'Kalix.admin.user.viewModel.UserViewModel',
        'Kalix.admin.user.controller.UserFormController'
    ],
    alias: 'widget.userEditForm',
    viewModel: {
        type: 'userViewModel'
    },
    controller: 'userFormController',
    id: "userEditForm",
    xtype: 'userEditForm',
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
            fieldLabel: '登录名',
            id: 'loginNameId',
            name: 'loginName',
            allowBlank: false,
            blankText: '登录名不能为空!',
            beforeLabelTpl: [
                '<span style="color:red;font-weight:bold" data-qtip="必填选项">*</span>'
            ]
        },
        {
            fieldLabel: '姓名',
            id: 'nameId',
            name: 'name',
            allowBlank: false,
            blankText: '姓名不能为空!',
            beforeLabelTpl: [
                '<span style="color:red;font-weight:bold" data-qtip="必填选项">*</span>'
            ]
        },
        {
            inputType: 'password',
            fieldLabel: '密码',
            id: 'passwordId',
            name: 'password',
            allowBlank: false,
            blankText: '密码不能为空!',
            beforeLabelTpl: [
                '<span style="color:red;font-weight:bold" data-qtip="必填选项">*</span>'
            ]
        },
        {
            inputType: 'password',
            fieldLabel: '确认密码',
            isFormField: false,
            id: 'confirmPasswordId',
            allowBlank: false,
            blankText: '确认密码不能为空!',
            beforeLabelTpl: [
                '<span style="color:red;font-weight:bold" data-qtip="必填选项">*</span>'
            ]
        },
        {
            fieldLabel: '邮箱',
            id: 'emailId',
            name: 'email',
            allowBlank: false,
            blankText: '邮箱不能为空!',
            beforeLabelTpl: [
                '<span style="color:red;font-weight:bold" data-qtip="必填选项">*</span>'
            ]
        },
        {
            fieldLabel: '电话号',
            id: 'phoneId',
            name: 'phone',
            allowBlank: false,
            blankText: '电话号不能为空!',
            beforeLabelTpl: [
                '<span >&nbsp;&nbsp;</span>'
            ]
        },
        {
            fieldLabel: '手机号',
            id: 'mobileId',
            name: 'mobile',
            allowBlank: false,
            blankText: '手机号不能为空!',
            beforeLabelTpl: [
                '<span style="color:red;font-weight:bold" data-qtip="必填选项">*</span>'
            ]
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
            beforeLabelTpl: [
                '<span style="color:red;font-weight:bold" data-qtip="必填选项">*</span>'
            ]
        }
    ],
    buttons: [
        {
            text: '保存', glyph: 0xf0c7, type: 'submit', handler: 'onUpdate'
        },
        {
            text: '重置', glyph: 0xf0e2, handler: 'onEditReset'
        }
    ]
});