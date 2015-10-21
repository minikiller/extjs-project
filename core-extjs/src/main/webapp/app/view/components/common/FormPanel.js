/**
 * 自定义formPanel，项目中的form必须扩展该类
 *00哦普朗克，，
 *         date:2015-10-16
 * @version 1.0.0
 */
Ext.define('kalix.view.components.common.FormPanel', {
    extend: 'Ext.FormPanel',
    frame: true,
    layout:'form',
    bodyPadding: 10,
   /* labelAlign: 'top',
    labelWidth: 75,*/
    //jsonSubmit: true,
    buttonAlign: "center",
    defaultType: 'textfield',
    //给必录项前面添加红星
    initComponent: function() {
        this.on('beforeadd', function(me, field){
            if (!field.allowBlank)
                field.fieldLabel = '<span style="color:red;font-weight:bold" data-qtip="必填选项">*</span>&nbsp;&nbsp;'+field.fieldLabel;
        });
        this.callParent(arguments);
    },


})
