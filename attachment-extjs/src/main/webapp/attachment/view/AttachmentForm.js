/** for attachment upload
 * @aurthor author
 */
Ext.define('kalix.attachment.view.AttachmentForm', {
    extend: 'Ext.form.Panel',
    //requires: [],
    alias: 'widget.attachmentForm',
    xtype: 'attachmentForm',
    frame: true,
    items: [
        //{
        //    xtype: 'textfield',
        //    fieldLabel: '附件编号',
        //    labelAlign: 'right',
        //    labelWidth: 60,
        //    width: 200,
        //    name: 'id'
        //},
        //{
        //    xtype: 'textfield',
        //    fieldLabel: '附件版本',
        //    labelAlign: 'right',
        //    labelWidth: 60,
        //    width: 200,
        //    name: 'rev'
        //},
        {
            xtype: 'filefield',
            fieldLabel: 'attachment',
            labelWidth: 100,
            buttonText: '...',
            name: 'attachment'
        }
    ]
});