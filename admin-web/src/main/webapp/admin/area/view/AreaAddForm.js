/**
 * 区域新增表单
 *
 * @author majian <br/>
 *         date:2015-7-24
 * @version 1.0.0
 */
Ext.define('Kalix.admin.area.view.AreaAddForm', {
    extend: 'Ext.FormPanel',
    requires: [
        'Kalix.admin.area.viewModel.AreaViewModel',
        'Kalix.admin.area.controller.AreaFormController'
    ],
    alias: 'widget.areaAddForm',
    viewModel: {
        type: 'areaViewModel'
    },
    controller: 'areaFormController',
    id: "areaAddForm",
    xtype: "areaAddForm",
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
        {xtype: 'hiddenfield', name: 'parentId', id: 'parentIdId', value: '-1'},
        {xtype: 'hiddenfield', name: 'isLeaf', value: '1'},
        {
            fieldLabel: '上级区域',
            id: "parentName",
            isFormField: false,
            disabled: true,
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
            fieldLabel: '区域代码',
            id: 'codeId',
            name: 'code',
            allowBlank: false,
            blankText: '区域不能为空!',
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
        },
        {
            fieldLabel: '纬度',
            id: 'wdId',
            name: 'wd'
        },
        {
            fieldLabel: '经度',
            id: 'jdId',
            name: 'jd'
        }
    ],
    buttons: [
        {
            text: '保存',
            type: 'submit',
            glyph: 0xf0c7,
            handler: 'onSave'
        },
        {
            text: '重置',
            glyph: 0xf0e2,
            handler: 'onAddReset'
        }
    ]
});