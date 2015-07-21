/**
 * 登陆视图模型
 *
 * @author majian <br/>
 *         date:2015-7-10
 * @version 1.0.0
 */
Ext.define('Kalix.view.login.Login', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Kalix.view.login.LoginController',
        'Kalix.view.login.LoginModel'
    ],
    xtype: 'login',
    controller: 'login',
    viewModel: {
        type: 'login'
    },
    bodyStyle: "background-image:url('resources/images/login_bg.jpg')",
    items: [{
        xtype: 'window',
        autoShow: true,
        width: 400,
        height: 200,
        closable: false,
        resizable: false,
        draggable: false,
        icon: "resources/images/computer.png",
        bind: {
            title: '{title}'
        },
        items: [{
            xtype: 'form',
            id: 'loginForm',
            labelAlign: 'center',
            labelWidth: 75,
            bodyStyle: "padding:15px",
            //jsonSubmit: true,
            defaultType: 'textfield',
            frame: true,
            buttonAlign: "center",
            method: "GET",
            items: [
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
                    xtype: 'hiddenfield',
                    id: "vcodeId",
                    name: 'vcode',
                    value: '123'
                }/*,
                 {
                 items : [{
                 xtype:'panel',
                 layout : 'table', // 把整个空间划分成两列
                 items : [{
                 layout : 'form', // 右边列再分成上下两行
                 width : 85,
                 items : [{
                 name : 'login.validateCode',
                 xtype : 'textfield',
                 fieldLabel : '验证码',
                 regex : /^[0-9]{4}$/,
                 regexText : '图片不清楚吗？请点击图片进行刷新，验证码为4位数字!',
                 width : 70,
                 allowBlank : false,
                 blankText : '验证码不能为空!'
                 }]
                 }, {
                 html : '<img id="photo" src="user.action"  onmousedown="changeImg(this)"/>'
                 }]
                 }]
                 }*/],
            buttons: [
                {
                    text: '登陆', type: 'button', handler: 'onLogin'
                },
                {
                    text: '重置', handler: 'onReset'
                }
            ]
        }]
    }]
});
