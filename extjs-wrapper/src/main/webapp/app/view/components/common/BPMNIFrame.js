/**
 * 自定义formPanel，项目中的form必须扩展该类
 */
Ext.define('kalix.view.components.common.BPMNIFrame', {
    extend: 'Ext.ux.IFrame',
    alias: 'widget.bpmniframe',
    src:'bpmn/index.html',
    style:'background:white url("bpmn/grid.gif")'
});
