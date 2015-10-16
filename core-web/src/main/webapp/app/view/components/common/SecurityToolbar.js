/**
 * 权限控制工具条
 *
 * @author majian <br/>
 *         date:2015-8-14
 * @version 1.0.0
 */
Ext.define('kalix.view.components.common.SecurityToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.securityToolbar',
    xtype: 'securityToolbar',
    verifyButton: function (buttons) {
        if (buttons == null) {
            return;
        }
        var permissions = "";
        for (var i = 0; i < buttons.length; i++) {
            var button = buttons[i];
            if (button.permission != null) {
                permissions += button.permission;
            }
            if (i + 1 != buttons.length) {
                permissions += "_";
            }
        }
        var securityToolbar = this;
        //查询授权
        Ext.Ajax.request({
            url: "/kalix/camel/rest/system/applications/modules/children/buttons/" + permissions,
            method: "GET",
            callback: function (options, success, response) {
                var resp = Ext.JSON.decode(response.responseText);
                if (resp != null && resp.buttons != null) {
                    var _buttons = new Array();
                    for (var i = 0; i < buttons.length; i++) {
                        var button = buttons[i];
                        if (button.permission == null) {
                            securityToolbar.add(button);
                            continue;
                        }
                        var respButtons = resp.buttons;
                        for (var p = 0; p < respButtons.length; p++) {
                            var respButton = respButtons[p];
                            if (respButton.permission == button.permission) {
                                if (respButton.status) {
                                    _buttons.push(button);
                                }
                            }
                        }
                    }
                    securityToolbar.add(_buttons);
                }
            }
        });
    },
    initComponent: function () {
        this.callParent(arguments);
    }

});