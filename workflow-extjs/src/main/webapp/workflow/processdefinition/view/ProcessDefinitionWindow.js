/**
 * 流程定义表格
 * @author majian <br/>
 *         date:2015-7-3
 * @version 1.0.0
 */
Ext.define('kalix.workflow.processdefinition.view.ProcessDefinitionWindow', {
    extend: 'Ext.window.Window',
    requires:[
        'kalix.view.components.common.BPMNIFrame',
        'kalix.workflow.processdefinition.controller.ProcessDefinitionWindowController'
    ],
    alias: 'widget.processDefinitionWindow',
    xtype: "processDefinitionWindow",
    controller: 'processDefinitionWindowController',
    width: 1024,
    height:768,
    border: false,
    modal: true,
    resizable: false,
    buttonAlign: 'center',
    layout:'fit',
    items:[
        {
            xtype:'bpmniframe'
        }
    ],
    buttons: [{
        text: '保存',
        glyph: 'xf0c7@FontAwesome',
        handler: 'onSave'
    },
        {
            text: '关闭',
            glyph: 'xf00d@FontAwesome',
            handler: function () {
                this.up('window').close();
            }
        }
    ]
});