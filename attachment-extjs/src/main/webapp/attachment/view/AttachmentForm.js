/** for attachment upload
 * @aurthor author
 */
Ext.define('kalix.attachment.view.AttachmentForm', {
    extend: 'Ext.form.Panel',
    //requires: [],
    alias: 'widget.attachmentForm',
    xtype: 'attachmentForm',
    frame: true,
    timeout: 60,
    items: [
        {
            xtype: 'filefield',
            fieldLabel: 'attachment',
            labelWidth: 100,
            buttonText: '...',
            name: 'attachment'
        }
    ]
});