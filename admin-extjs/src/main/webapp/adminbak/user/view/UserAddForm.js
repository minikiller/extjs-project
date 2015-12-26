/**
 * 用户新增表单
 *
 * @author majian <br/>
 *         date:2015-6-18
 * @version 1.0.0
 */
Ext.define('kalix.admin.user.view.UserAddForm', {
    extend: 'Ext.FormPanel',
    requires: [
        'kalix.admin.user.viewModel.UserViewModel',
        'kalix.admin.user.controller.UserFormController'
    ],
    alias: 'widget.userAddForm',
    viewModel: {
        type: 'userViewModel'
    },
    controller: 'userFormController',
    xtype: "userAddForm",
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
            fieldLabel: '登录名',
            itemId: 'loginNameId',
            name: 'loginName',
            allowBlank: false,
            blankText: '登录名不能为空!',
            beforeLabelTpl: [
                '<span style="color:red;font-weight:bold" data-qtip="必填选项">*</span>'
            ]
        },
        {
            fieldLabel: '姓名',
            itemId: 'nameId',
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
            itemId: 'passwordId',
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
            itemId: 'confirmPasswordId',
            allowBlank: false,
            blankText: '确认密码不能为空!',
            beforeLabelTpl: [
                '<span style="color:red;font-weight:bold" data-qtip="必填选项">*</span>'
            ]
        },
        {
            fieldLabel: '邮箱',
            itemId: 'emailId',
            name: 'email',
            allowBlank: false,
            blankText: '邮箱不能为空!',
            beforeLabelTpl: [
                '<span style="color:red;font-weight:bold" data-qtip="必填选项">*</span>'
            ]
        },
        {
            fieldLabel: '电话号',
            itemId: 'phoneId',
            name: 'phone',
            beforeLabelTpl: [
                '<span>&nbsp;&nbsp;</span>'
            ]
        },
        {
            fieldLabel: '手机号',
            itemId: 'mobileId',
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
            text: '保存', glyph: 'xf0c7@FontAwesome', type: 'submit', handler: 'onSave'
        },
        {
            text: '重置', glyph: 'xf0e2@FontAwesome', handler: 'onAddReset'
        }
    ]
});