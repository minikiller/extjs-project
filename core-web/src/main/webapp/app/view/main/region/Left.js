/**
 * 左侧面板
 *
 * @author majian <br/>
 *         date:2015-6-18
 * @version 1.0.0
 */
Ext.define('Kalix.view.main.region.Left', {

    extend: 'Ext.panel.Panel',

    uses: ['Kalix.view.components.core.Module'],

    alias: 'widget.mainleft',
    layout: {
        type: 'accordion',
        animate: true
    },
    id: 'leftPanel',
    width: 250,
    split: true,
    collapsible: true,

    items: []
});