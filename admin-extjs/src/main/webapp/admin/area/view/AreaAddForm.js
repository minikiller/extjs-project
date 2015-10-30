/**
 * 区域新增表单
 *
 * @author majian <br/>
 *         date:2015-7-24
 * @version 1.0.0
 */
Ext.define('kalix.admin.area.view.AreaAddForm', {
    extend: 'Ext.FormPanel',
    requires: [
        'kalix.admin.area.viewModel.AreaViewModel',
        'kalix.admin.area.controller.AreaFormController'
    ],
    alias: 'widget.areaAddForm',
    viewModel: {
        type: 'areaViewModel'
    },
    controller: 'areaFormController',
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
            itemId: "parentName",
            isFormField: false,
            disabled: true,
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
            fieldLabel: '区域代码',
            itemId: 'codeId',
            name: 'code',
            allowBlank: false,
            blankText: '区域不能为空!',
            beforeLabelTpl: [
                '<span style="color:red;font-weight:bold" data-qtip="必填选项">*</span>'
            ]
        },
        {
            fieldLabel: '中心代码',
            itemId: 'centerCodeId',
            name: 'centerCode',
            allowBlank: false,
            blankText: '中心代码不能为空!',
            beforeLabelTpl: [
                '<span style="color:red;font-weight:bold" data-qtip="必填选项">*</span>'
            ]
        },
        {
            fieldLabel: '纬度',
            itemId: 'wdId',
            name: 'wd'
        },
        {
            fieldLabel: '经度',
            itemId: 'jdId',
            name: 'jd'
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