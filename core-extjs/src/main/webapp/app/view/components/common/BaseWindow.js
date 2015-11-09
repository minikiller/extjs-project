/**
 * 用户新增表单
 *
 * @author majian <br/>
 *         date:2015-6-18
 * @version 1.0.0
 */

Ext.define('kalix.view.components.common.BaseWindow', {
    extend: 'Ext.window.Window',
    requires: [
        'kalix.view.components.common.FormPanel'
    ],
    alias: 'widget.baseWindow',
    xtype: "baseWindow",
    width: 800,
    border: false,
    modal: true,
    resizable: false,
    buttonAlign: 'center',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    bind: {
        title: '{title}',
        icon: '{icon}'
    },
    defaults: {
        layout: 'form',
        xtype: 'baseForm',
        flex: 1
    }
});