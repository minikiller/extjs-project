/**
 * 机构编辑表单
 *
 * @author majian <br/>
 *         date:2015-7-21
 * @version 1.0.0
 */
Ext.define('Kalix.admin.dep.view.DepEditForm', {
    extend: 'Ext.FormPanel',
    requires: [
        'Kalix.admin.dep.viewModel.DepViewModel',
        'Kalix.admin.dep.controller.DepFormController'
    ],
    alias: 'widget.depEditForm',
    viewModel: {
        type: 'depViewModel'
    },
    controller: 'depFormController',
    id: "depEditForm",
    xtype: 'depEditForm',
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
        {xtype: 'hiddenfield', name: 'parentId',id:'parentIdId',value:'-1'},
        {xtype: 'hiddenfield', name: 'orgId',id:'orgIdId',value:'-1'},
        {xtype: 'hiddenfield', name: 'isLeaf',value:'1'},
        {
            fieldLabel: '所属机构',
            id:"orgName",
            isFormField: false,
            disabled:true,
            beforeLabelTpl: [
                '<span style="color:red;font-weight:bold" data-qtip="必填选项">*</span>'
            ]
        },
        {
            fieldLabel: '上级部门',
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
            fieldLabel: '部门代码',
            id: 'codeId',
            name: 'code',
            allowBlank: false,
            blankText: '部门不能为空!',
            beforeLabelTpl: [
                '<span style="color:red;font-weight:bold" data-qtip="必填选项">*</span>'
            ]
        },
        {
            fieldLabel: '中心代码',
            id: 'centerCodeId',
            name: 'centerCode',
            allowBlank: false,
            blankText: '中心代码不能为空!',
            beforeLabelTpl: [
                '<span style="color:red;font-weight:bold" data-qtip="必填选项">*</span>'
            ]
        }
    ],
    buttons: [
        {
            text: '保存', glyph: 0xf0c7, type: 'submit', handler: 'onUpdate'
        },
        {
            text: '重置', glyph: 0xf0e2, handler: 'onEditReset'
        }
    ]
});