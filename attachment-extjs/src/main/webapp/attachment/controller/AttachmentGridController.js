/**
 * @author chenyanxu
 */
Ext.define('kalix.attachment.controller.AttachmentGridController', {
    extend: 'kalix.controller.BaseGridController',
    alias: 'controller.attachmentGridController',
    onChange: function (target, event, domValue) {
        if (domValue != '') {
            target.ariaEl.dom.value = '';
        }
    }
});