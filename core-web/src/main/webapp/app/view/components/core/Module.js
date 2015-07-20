/**
 * 模块组件
 *
 * @author majian <br/>
 *         date:2015-6-18
 * @version 1.0.0
 */
Ext.define('Kalix.view.components.core.Module', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Kalix.controller.components.core.ModuleController'
    ],

    controller: "moduleComponentController",

    alias: 'widget.moduleComponent',

    collapsible: true,
    split: false,
    layoutConfig: {
        animate: true
    },
    items: [],
    constructor: function (config) {
        if (config) {
            this.id = config.id;
            this.title = config.title;
            this.icon = config.icon;
            var menu = {menus: []};
            menu.menus = config.menus;
            this.items[0] = Ext.create("Kalix.view.components.core.Menu", menu);
        }
        this.callParent(arguments);
    }
});