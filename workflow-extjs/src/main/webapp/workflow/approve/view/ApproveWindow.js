/**审批窗口
 * @author chenyanxu <br/>
 *         date:2016-3-3
 * @version 1.0.0
 */
Ext.define('kalix.workflow.approve.view.ApproveWindow', {
    extend: 'Ext.Window',
    requires: [
        'kalix.workflow.approve.controller.ApproveWindowController',
        'kalix.workflow.approve.viewModel.ApproveViewModel'
    ],
    xtype: 'approveWindow',
    controller: 'approveWindowController',
    viewModel: 'approveViewModel',
    width: 840,
    buttonAlign: "center",
    border: false,
    modal: true,
    title: "",
    buttons: [
        {
            text: '同意',
            handler: 'onAgree'
        },
        {
            text: '不同意',
            handler: 'onDisagree'
        }
    ]
});