/**
 * 登陆视图模型
 *
 * @author majian <br/>
 *         date:2015-7-10
 * @version 1.0.0
 */
Ext.define('Kalix.view.login.LoginModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.login',
    data: {
        title: '系统登陆',
        loginUrl: "login.jsp"
    }
});