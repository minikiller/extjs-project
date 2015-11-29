/** for attachment upload
 * @aurthor author
 */
Ext.define('kalix.attachment.view.AttachmentForm', {
    extend: 'Ext.form.Panel',
    requires: ['kalix.attachment.view.AttachmentFileField'],
    alias: 'widget.attachmentForm',
    xtype: 'attachmentForm',
    frame: true,
    timeout: 60,
    height:20,
    items: [
        {
            xtype: 'attachmentFileField',
            //xtype: 'filefield',
            width:50,
            buttonOnly:true,
           // hideLabel:true,
            //icon:'/kalix/attachment/resources/images/attachment_add.png',
            buttonText: '上传',
            name: 'attachment',
            listeners:{
                change:function(target,value, eOpts){
                    target.findParentByType('window').items.getAt(0).getController().onChange(target,value, eOpts);
                }
            }
        }
    ],
    listeners:{
        afterrender: function (target) {
           target.ariaEl.dom.style.border='none';
        }
    }
});