/**
 * @author chenyanxu
 */
Ext.define('kalix.workflow.approve.controller.ApproveWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.approveWindowController',
    requires: ['kalix.core.Notify'],
    onAgree: function () {
        alert(1);
    },
    onDisagree: function () {
        alert(2);
    }
});
