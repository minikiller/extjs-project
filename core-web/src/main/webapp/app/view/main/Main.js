/**
 * 主视图
 *
 * @author majian <br/>
 *         date:2015-6-18
 * @version 1.0.0
 */
Ext.define('Kalix.view.main.Main', {
    extend: 'Ext.container.Container',
    requires: [
        'Kalix.view.main.MainController',
        'Kalix.view.main.MainModel'
    ],

    xtype: 'app-main',

    uses: ['Kalix.view.main.region.Top', 'Kalix.view.main.region.Left', 'Kalix.view.main.region.Center', 'Kalix.view.main.region.Bottom'],

    controller: 'main',
    viewModel: {
        type: 'main'
    },

    layout: {
        type: 'border'
    },
    listeners: {
        resize: 'onResize'
    },

    items: [{
        xtype: 'maintop',
        region: 'north'
    }, {
        xtype: 'mainleft',
        bind: {
            title: '{menu.title}'
        },
        region: 'west'
    }, {
        xtype: 'maincenter',
        region: 'center'
    }, {
        xtype: 'mainbottom',
        region: 'south'
    }],
    initComponent: function () {
        Ext.setGlyphFontFamily('FontAwesome'); // 设置图标字体文件，只有设置了以后才能用glyph属性
        this.callParent();
    },
});
