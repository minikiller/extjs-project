/** for attachment upload
 * @aurthor author
 */
Ext.define('kalix.attachment.view.AttachmentWindow', {
    extend: 'kalix.view.components.common.BaseWindow',
    requires: [
        'kalix.controller.BaseWindowController',
        'kalix.attachment.viewModel.AttachmentViewModel',
        'kalix.attachment.view.AttachmentGrid'
    ],
    alias: 'widget.attachmentWindow',
    xtype: "attachmentWindow",
    viewModel: 'attachmentViewModel',
    controller: {
        type: 'baseWindowController',
        storeId: 'attachmentStore'
    },
    layout: 'container',
    defaults: {},
    items: [{
        xtype: 'attachmentGrid',
        margin: 5
    }
    ],
    listeners: {
        beforeshow: function () {
            var store = this.items.getAt(0).store;
            var mainId = this.getViewModel().get('rec').id;

            store.proxy.extraParams = {jsonStr: '{mainId:' + mainId + '}'}
            store.load();
        }
    }
});