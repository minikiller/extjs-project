/**
 * 用户编辑表单
 *
 * @author majian <br/>
 *         date:2015-6-18
 * @version 1.0.0
 */
Ext.define('Kalix.notice.view.NoticeEditForm', {
    extend: 'Ext.FormPanel',
    requires: [
        'Kalix.notice.viewModel.NoticeViewModel',
        'Kalix.notice.controller.NoticeFormController'
    ],
    alias: 'widget.noticeEditForm',
    viewModel: {
        type: 'noticeViewModel'
    },
    currentNotice: null,
    config: {
        currentNotice: null
    },

    bind: {
        currentNotice: "{currentNotice}",
    },
    controller: 'noticeFormController',
    id: "noticeEditForm",
    xtype: 'noticeEditForm',
    labelAlign: 'center',
    labelWidth: 75,
    autoWidth: true,
    autoHeight: true,
    bodyStyle: "padding:15px",
    frame: true,
    jsonSubmit: true,
    method: "PUT",
    defaultType: 'textfield',
    buttonAlign: "center",

    items: [
        {xtype: 'hiddenfield', name: 'id', bind: {value: '{currentNotice.id}'}},

        {
            fieldLabel: '标题',
            id: 'titleId',
            name: 'title',
            allowBlank: false,
            blankText: '标题不能为空!',
            bind: '{currentNotice.title}',
            beforeLabelTpl: [
                '<span style="color:red;font-weight:bold" data-qtip="必填选项">*</span>'
            ]
        },
        {
            fieldLabel: '内容',
            id: 'contentId',
            name: 'content',
            allowBlank: false,
            blankText: '内容不能为空!',
            bind: {value: '{currentNotice.content}'},
            beforeLabelTpl: [
                '<span style="color:red;font-weight:bold" data-qtip="必填选项">*</span>'
            ]
        },

    ],
    buttons: [
        {
            text: '保存', glyph: 0xf0c7, type: 'submit', handler: 'onUpdate',
        },
        {
            text: '重置', glyph: 0xf0e2, handler: 'onEditReset'
        }
    ]
});