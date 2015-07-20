/**
 * 登陆视图控制器
 *
 * @author majian <br/>
 *         date:2015-7-10
 * @version 1.0.0
 */
Ext.define('Kalix.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',

    onLogin: function () {
        var form = Ext.getCmp("loginForm");
        var username = Ext.getCmp("loginNameId").getValue();
        var password = Ext.getCmp("passwordId").getValue();
        var vcode = Ext.getCmp("vcodeId").getValue();
        if (form.isValid()) {
            Ext.Ajax.request({
                url: this.getView().getViewModel().get("loginUrl"),
                params: {username: username, password: password, vcode: vcode},
                method: 'POST',
                success: function (response, options) {
                    var resp = Ext.util.JSON.decode(response.responseText);
                    if (!resp.success) {
                        Ext.MessageBox.alert(CONFIG.ALTER_TITLE_FAILURE, resp.message);
                        return;
                    }
                    if (resp.location != null) {
                        window.location.href = resp.location;
                    }
                },
                failure: function (response, options) {
                    Ext.MessageBox.alert(CONFIG.ALTER_TITLE_FAILURE, "网络错误,登陆失败!");
                }
            });

        }
    },
    onReset: function () {
        Ext.getCmp("loginForm").reset();
    }

});