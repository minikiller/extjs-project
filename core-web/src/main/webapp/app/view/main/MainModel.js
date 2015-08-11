/**
 * 主视图模型
 *
 * @author majian <br/>
 *         date:2015-6-18
 * @version 1.0.0
 */
Ext.define('Kalix.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    data: {
        name: 'Kalix',

        system: {
            name: '应用开发框架',
            version: "V1.0",
            icon: "resources/images/logo_horizontal.png",
            background: 'resources/images/f2.gif',
            copyright: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;copyright 吉林锐迅信息技术有限公司"
        },
        user: {
            url: "/kalix/camel/rest/users/info",
            quit: "/kalix/logout"
        },
        application: {
            url: '/kalix/camel/rest/system/applications'
        },
        module: {
            url: '/kalix/camel/rest/system/applications/'
        },
        menu: {
            title: '菜单列表'
        }
    }

    //TODO - add data, formulas and/or methods to support your view
});