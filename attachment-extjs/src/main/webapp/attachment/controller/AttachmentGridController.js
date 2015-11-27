/**
 * @author chenyanxu
 */
Ext.define('kalix.attachment.controller.AttachmentGridController', {
    extend: 'kalix.controller.BaseGridController',
    alias: 'controller.attachmentGridController',
    onChange: function (target, event, domValue) {
        if (domValue != '') {
            var form = this.getView().findParentByType('window').items.getAt(1);
            //this.getView().findParentByType('window').items.getAt(1).items.getAt(0).setValue('111')
            //this.getView().findParentByType('window').items.getAt(1).items.getAt(1).setValue('111')
            // form.items.getAt(2).ariaEl.dom.value=domValue;
            form.submit({
                url: '/kalix/camel/rest/upload',
                waitMsg: 'Uploading your photo...',
                success: function (fp, o) {
                    Ext.Msg.alert('Success', 'Your photo "' + o.result.file + '" has been uploaded.');
                }

            });
            target.ariaEl.dom.value = '';
        }
    }
});