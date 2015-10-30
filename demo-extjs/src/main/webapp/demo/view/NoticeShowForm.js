/**
 * 查看表单
 *
 * @author majian <br/>
 *         date:2015-6-18
 * @version 1.0.0
 */
Ext.define('kalix.demo.view.NoticeShowForm', {
    extend: 'Ext.FormPanel',
    requires: [
        'kalix.demo.viewModel.NoticeViewModel',
        'kalix.demo.controller.NoticeFormController'
    ],
    alias: 'widget.noticeShowForm',
    viewModel: {
        type: 'noticeViewModel'
    },

    controller: 'noticeFormController',
    itemId: "noticeShowForm",
    xtype: "noticeShowForm",
    labelAlign: 'center',
    labelWidth: 75,
    autoWidth: true,
    autoHeight: true,
    jsonSubmit: true,
    bodyStyle: "padding:15px",
    frame: true,
    buttonAlign: "center",
    defaultType: 'textfield',
    items: [
        {
            fieldLabel: '标题',
            itemId: 'title',
            allowBlank: false,
            blankText: '标题不能为空!',
            disabled: true,
            beforeLabelTpl: [
                '<span style="color:red;font-weight:bold" data-qtip="必填选项">*</span>'
            ]
        },
        {
            fieldLabel: '内容',
            itemId: 'content',
            xtype: 'textarea',
            allowBlank: false,
            blankText: '内容不能为空!',
            disabled: true,
            beforeLabelTpl: [
                '<span style="color:red;font-weight:bold" data-qtip="必填选项">*</span>'
            ]
        },

    ]
});