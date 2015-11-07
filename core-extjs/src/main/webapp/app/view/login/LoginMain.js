/**
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
    //layout:'form',

    xtype: 'login',
    controller: 'login',
    icon: 'resources/images/lock.png',
    title: '系统登陆',
    id: 'loginForm',
    method: "POST",
    defaultType: 'textfield',
    frame: true,
    url: 'login.jsp',

    bodyBorder: false,
    bodyPadding: 20,
    border: false,
    buttonAlign: 'center',
    /*defaults: {
        //labelWidth: 60,
        margin : '5 0'
    },*/
    width: 400,
    //header: false,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [{
        inputType: 'textfield',
        //glyph : 'xf0e2@FontAwesome',
        //icon: 'resources/images/lock.png',
        fieldLabel: '账号',
        name: 'username',
        cls: 'auth-textbox',
        allowBlank: false,
        height: 55,
        blankText: '账号不能为空!',
        hideLabel: true,
        emptyText: '账号',
        triggers: {
            glyphed: {
                cls: 'trigger-glyph-noop auth-email-trigger'
            }
        }
        //beforeLabelTpl: '<span style="color:red;font-weight:bold" data-qtip="必填选项">*</span>'
    }, {
        inputType: 'password',
        //glyph : 'xf0e2@FontAwesome',
        fieldLabel: '密码',
        name: 'password',
        cls: 'auth-textbox',
        height: 55,
        allowBlank: false,
        blankText: '密码不能为空!',
        hideLabel: true,
        emptyText: '密码',
        triggers: {
            glyphed: {
                cls: 'trigger-glyph-noop auth-password-trigger'
            }
        },


        //beforeLabelTpl: '<span style="color:red;font-weight:bold" data-qtip="必填选项">*</span>',
        listeners: {
            keyup: {
                element: 'el',
                fn: 'onKeyup'
            }
        }
    }
    ],

    buttons: [{
        text: '登陆',
        handler: 'onLogin',
        //width:'250',
        scale: 'large',
        //ui: 'soft-green',
        iconAlign: 'right',
        iconCls: 'x-fa fa-sign-in'
    }, {
        text: '重置',
        scale: 'large',
        handler: 'onReset',
        //ui: 'soft-green',
        iconAlign: 'right',
        iconCls: 'x-fa fa-undo'
    }
    ],
    initComponent: function () {
        var me = this, listen;

        me.addCls('auth-dialog');
        me.callParent();

    },
});
