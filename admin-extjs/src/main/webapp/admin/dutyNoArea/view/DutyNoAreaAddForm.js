/**
 * 部门新增表单
 *
 * @author zangyanming <br/>
 *         date:2016-3-10
 * @version 1.0.0
 */
Ext.define('kalix.admin.dutyNoArea.view.DutyNoAreaAddForm', {
    extend: 'Ext.FormPanel',
    requires: [
        'kalix.admin.dutyNoArea.viewModel.DutyNoAreaViewModel',
        'kalix.admin.dutyNoArea.controller.DutyNoAreaFormController'
    ],
    alias: 'widget.dutyNoAreaAddForm',
    viewModel: {
        type: 'dutyNoAreaViewModel'
    },
    controller: 'dutyNoAreaFormController',
    xtype: "dutyNoAreaAddForm",
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
        {xtype: 'hiddenfield', name: 'depid'},
        {
            fieldLabel: '所属部门',
            itemId: "depName",
            isFormField: false,
            disabled:true,
            beforeLabelTpl: [
                '<span style="color:red;font-weight:bold" data-qtip="必填选项">*</span>'
            ]
        },
        {
            fieldLabel: '职位名称',
            name: 'name',
            allowBlank: false,
            blankText: '名称不能为空!',
            beforeLabelTpl: [
                '<span style="color:red;font-weight:bold" data-qtip="必填选项">*</span>'
            ]
        }
    ],
    buttons: [
        {
            text: '保存',
            type: 'submit',
            glyph: 'xf0c7@FontAwesome',
            handler: 'onSave'
        },
        {
            text: '重置',
            glyph: 'xf0e2@FontAwesome',
            handler: 'onAddReset'
        }
    ]
});