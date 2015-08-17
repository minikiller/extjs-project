/**
 * 权限控制操作列
 *
 * @author majian <br/>
 *         date:2015-8-17
 * @version 1.0.0
 */
Ext.define('Kalix.view.components.common.SecurityActionColumn', {
    extend: 'Ext.grid.column.Action',
    alias: 'widget.securityActionColumn',
    xtype: 'securityActionColumn',
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
        var securityActionColumn = this;
        //查询授权
        Ext.Ajax.request({
            url: "/kalix/camel/rest/system/applications/modules/menus/buttons/" + permissions,
            method: "GET",
            callback: function (options, success, response) {
                var resp = Ext.JSON.decode(response.responseText);
                if (resp != null && resp.buttons != null) {
                    for (var i = 0; i < buttons.length; i++) {
                        var button = buttons[i];
                        if (button.permission == null) {
                            securityActionColumn.add(button);
                            continue;
                        }
                        var respButtons = resp.buttons;
                        for (var p = 0; p < respButtons.length; p++) {
                            var respButton = respButtons[p];
                            if (respButton.permission == button.permission) {
                                if (respButton.status) {
                                    securityActionColumn.add(button);
                                }
                            }
                        }
                    }
                }
            }
        });
    },
    initComponent: function () {
        this.callParent(arguments);
    }

});