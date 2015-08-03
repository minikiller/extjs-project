/**
 * 授权窗口
 * @author majian <br/>
 *         date:2015-8-3
 * @version 1.0.0
 */
Ext.define('Kalix.app.components.AuthorizationWindow', {
    extend: 'Ext.Window',
    xtype: 'authorizationWindow',
    width: 680,
    height: 500,
    border: false,
    modal: true,
    title: "权限分配",
    layout: 'form',
    buttonAlign: 'right',
    items: [{
        itemId: 'authorizationTree',
        xtype: 'treepanel',
        height: 430,
        autoScroll: true,
        border: true,
        rootVisible: false,
        store: {
            proxy: {
                type: "ajax",
                url: '/kalix/camel/rest/applications/authorization'
            }
        },
        listeners: {
            checkchange: function (node, checked, obj) {
                node.cascadeBy(function (n) {
                    n.set('checked', checked);
                });
                checkParent(node);
                function checkParent(node) {
                    node = node.parentNode;
                    if (!node) return;
                    var checkP = false;
                    node.cascadeBy(function (n) {
                        if (n != node) {
                            if (n.get('checked') == true) {
                                checkP = true;
                            }
                        }
                    });
                    node.set('checked', checkP);
                    checkParent(node);
                }
            }
        }
    }, {
        xtype: 'button',
        text: '保存',
        handler: function () {
            var records = Ext.ComponentQuery.query('authorizationWindow')[0].down('#authorizationTree').getChecked();
            var ids = [];
            Ext.Array.each(records, function (rec) {
                ids.push(rec.get('id'));
            });
            alert(ids.join(','));
        }
    }, {
        xtype: 'button',
        text: '关闭',
        handler: function () {
            Ext.ComponentQuery.query('authorizationWindow')[0].close();
        }
    }]
});