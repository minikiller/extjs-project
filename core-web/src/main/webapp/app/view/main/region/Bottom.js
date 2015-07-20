/**
 * 底部面板
 *
 * @author majian <br/>
 *         date:2015-6-18
 * @version 1.0.0
 */
Ext.define('Kalix.view.main.region.Bottom', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.mainbottom',

    items: [
        {
            xtype: "label",
            bind: {
                html: '{system.copyright}'
            }
        }
    ]
});