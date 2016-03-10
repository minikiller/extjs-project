/**
 * 机构编辑表单
 *
 * @author zangyanming <br/>
 *         date:2016-3-10
 * @version 1.0.0
 */
Ext.define('kalix.admin.depNoArea.view.DepNoAreaEditForm', {
    extend: 'Ext.FormPanel',
    requires: [
        'kalix.admin.depNoArea.viewModel.DepNoAreaViewModel',
        'kalix.admin.depNoArea.controller.DepNoAreaFormController'
    ],
    alias: 'widget.depNoAreaEditForm',
    viewModel: {
        type: 'depNoAreaViewModel'
    },
    controller: 'depNoAreaFormController',
    xtype: 'depNoAreaEditForm',
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
        {xtype: 'hiddenfield', name: 'id'},
        //{xtype: 'hiddenfield', name: 'parentId', itemId: 'parentIdId', value: '-1'},
        {xtype: 'hiddenfield', name: 'orgId', itemId: 'orgIdId', value: '-1'},
        {xtype: 'hiddenfield', name: 'isLeaf',value:'1'},
        {
            fieldLabel: '所属机构',
            itemId: "orgName",
            isFormField: false,
            disabled:true,
            beforeLabelTpl: [
                '<span style="color:red;font-weight:bold" data-qtip="必填选项">*</span>'
            ]
        },
        {
            fieldLabel: '上级部门',
            itemId: "parentName",
            isFormField: false,
            disabled:true,
            beforeLabelTpl: [
                '<span style="color:red;font-weight:bold" data-qtip="必填选项">*</span>'
            ]
        },
        {
            fieldLabel: '名称',
            itemId: 'nameId',
            name: 'name',
            allowBlank: false,
            blankText: '名称不能为空!',
            beforeLabelTpl: [
                '<span style="color:red;font-weight:bold" data-qtip="必填选项">*</span>'
            ]
        },
        {
            fieldLabel: '部门代码',
            itemId: 'codeId',
            name: 'code',
            allowBlank: false,
            blankText: '部门不能为空!',
            beforeLabelTpl: [
                '<span style="color:red;font-weight:bold" data-qtip="必填选项">*</span>'
            ]
        }
    ],
    buttons: [
        {
            text: '保存', glyph: 'xf0c7@FontAwesome', type: 'submit', handler: 'onUpdate'
        },
        {
            text: '重置', glyph: 'xf0e2@FontAwesome', handler: 'onEditReset'
        }
    ]
});