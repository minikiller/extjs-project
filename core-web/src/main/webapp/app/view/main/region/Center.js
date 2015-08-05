/**
 * 中部面板
 *
 * @author majian <br/>
 *         date:2015-6-18
 * @version 1.0.0
 */
Ext.define('Kalix.view.main.region.Center', {
    extend: 'Ext.panel.Panel',

    /*
     Uncomment to give this component an xtype
     xtype: 'center',
     */
    alias: 'widget.maincenter',

    bodyStyle: {
        background: 'url(resources/images/center_bg.png) right bottom no-repeat #caeaff'
    },
    id: 'centerPanel',
    items: [{
        xtype: 'tabpanel',
        id: 'centerTabPanel',
        items: [{
            title: '首页'
        }]
    }
    ]
});