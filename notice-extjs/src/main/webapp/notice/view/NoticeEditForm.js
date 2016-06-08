/**
 * 用户编辑表单
 *
 * @author majian <br/>
 *         date:2015-6-18
 * @version 1.0.0
 */
Ext.define('kalix.notice.view.NoticeEditForm', {
    extend: 'Ext.FormPanel',
    requires: [
        'kalix.notice.viewModel.NoticeViewModel',
        'kalix.notice.controller.NoticeFormController'
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
            beforeLabelTpl: [
                '<span style="color:red;font-weight:bold" data-qtip="必填选项">*</span>'
            ]
        },
        {
            fieldLabel: '内容',
            id: 'contentId',
            xtype: 'textarea',
            name: 'content',
            allowBlank: false,
            blankText: '内容不能为空!',
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
            text: '重置', iconCls:'iconfont icon-reset iconfont-btn-small',handler: 'onEditReset'
        }
    ]
});