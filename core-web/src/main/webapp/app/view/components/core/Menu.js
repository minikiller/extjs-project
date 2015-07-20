/**
 * 菜单组件
 *
 * @author majian <br/>
 *         date:2015-6-18
 * @version 1.0.0
 */
Ext.define('Kalix.view.components.core.Menu', {
    extend: 'Ext.tree.Panel',
    requires: [
        'Kalix.controller.components.core.MenuController'
    ],
    alias: 'widget.menuComponent',
    controller: 'menuComponentController',
    rootVisible: false,
    lines: true,
    autoScroll: true,
    listeners: {
        //beforeload:'onBeforeload',
        //load:'onLoad',
        itemClick: 'onItemClick'
    },
    border: false,
    constructor: function (config) {

        if (config) {
            var _tree = {root: {children: []}};
            _tree.root.children = config.menus;
            this.store = Ext.create('Ext.data.TreeStore', _tree);
        }
        this.callParent();
    }
});