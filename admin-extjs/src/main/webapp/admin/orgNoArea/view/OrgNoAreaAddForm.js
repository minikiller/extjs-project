/**
 * 机构新增表单
 *
 * @author zangyanming <br/>
 *         date:2016-3-10
 * @version 1.0.0
 */
Ext.define('kalix.admin.orgNoArea.view.OrgNoAreaAddForm', {
    extend: 'Ext.FormPanel',
    requires: [
        'kalix.admin.orgNoArea.viewModel.OrgNoAreaViewModel',
        'kalix.admin.orgNoArea.controller.OrgNoAreaFormController'
    ],
    alias: 'widget.orgNoAreaAddForm',
    viewModel: {
        type: 'orgNoAreaViewModel'
    },
    controller: 'orgNoAreaFormController',
    xtype: "orgNoAreaAddForm",
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
        {xtype: 'hiddenfield', name: 'parentId', itemId: 'parentIdId', value: '-1'},
        {xtype: 'hiddenfield', name: 'isLeaf',value:'1'},
        {
            fieldLabel: '上级机构',
            id:"parentName",
            isFormField: false,
            disabled:true,
            beforeLabelTpl: [
                '<span style="color:red;font-weight:bold" data-qtip="必填选项">*</span>'
            ]
        },
        {
            fieldLabel: '名称',
            id: 'nameId',
            name: 'name',
            allowBlank: false,
            blankText: '名称不能为空!',
            beforeLabelTpl: [
                '<span style="color:red;font-weight:bold" data-qtip="必填选项">*</span>'
            ]
        },
        {
            fieldLabel: '机构代码',
            id: 'codeId',
            name: 'code',
            allowBlank: false,
            blankText: '机构不能为空!',
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