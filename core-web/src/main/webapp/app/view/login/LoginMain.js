﻿/**
 * 登陆表单
 *
 * date:2015-10-23
 *
 没有添加 enter 键提交支持的原因
 可以监听文本框输入的 keyup 事件来添加 enter 键提交表单操作
 但是，文本框没有 blur 方法，无法移除焦点
 即使在出现错误提示对话框时，enter 键也会激活提交行为

 */

Ext.define('kalix.view.login.LoginMain', {
    extend: 'Ext.form.Panel',
    requires: [
        'kalix.view.login.LoginController'
    ],
    xtype: 'login',
    controller: 'login',

    title: '系统登陆',
    id: 'loginForm',
    method: "POST",
    defaultType: 'textfield',
    frame: true,
    url: 'login.jsp',  //提交地址

    bodyBorder: false,
    bodyPadding: 20,
    border: false,
    buttonAlign: 'center',
    defaults: {
        labelWidth: 60
    },

    items: [{
        inputType: 'textfield',
        fieldLabel: '账号',
        name: 'loginName',
        allowBlank: false,
        blankText: '账号不能为空!',
        beforeLabelTpl: '<span style="color:red;font-weight:bold" data-qtip="必填选项">*</span>'
    }, {
        inputType: 'password',
        fieldLabel: '密码',
        name: 'password',
        allowBlank: false,
        blankText: '密码不能为空!',
        beforeLabelTpl: '<span style="color:red;font-weight:bold" data-qtip="必填选项">*</span>'
    }
    ],

    buttons: [{
        text: '登陆',
        handler: 'onLogin'
    }, {
        text: '重置',
        handler: 'onReset'
    }
    ]
});
