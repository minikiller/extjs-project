/**
 * 字典新增表单
 *
 * @author majian <br/>
 *         date:2015-6-18
 * @version 1.0.0
 */
Ext.define('kalix.admin.dict.view.DictAddForm', {
    extend: 'Ext.FormPanel',
    requires: [
        'kalix.admin.dict.viewModel.DictViewModel',
        'kalix.admin.dict.controller.DictFormController'
    ],
    alias: 'widget.dictAddForm',
    viewModel: {
        type: 'dictViewModel'
    },
    controller: 'dictFormController',
    xtype: "dictAddForm",
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
            fieldLabel: '标签名',
            itemId: 'labelId',
            name: 'label',
            allowBlank: false,
            blankText: '标签名不能为空!',
            beforeLabelTpl: [
                '<span style="color:red;font-weight:bold" data-qtip="必填选项">*</span>'
            ]
        },
        {
            fieldLabel: '数据值',
            itemId: 'valueId',
            name: 'value',
            allowBlank: false,
            blankText: '数据值不能为空!',
            beforeLabelTpl: [
                '<span style="color:red;font-weight:bold" data-qtip="必填选项">*</span>'
            ]
        },
        {
            fieldLabel: '类型',
            itemId: 'typeId',
            name: 'type',
            allowBlank: false,
            blankText: '类型不能为空!',
            beforeLabelTpl: [
                '<span style="color:red;font-weight:bold" data-qtip="必填选项">*</span>'
            ]
        },
        {
            xtype : 'numberfield',
            fieldLabel: '排序',
            itemId: 'sortId',
            name: 'sort',
            allowBlank: false,
            beforeLabelTpl: [
                '<span style="color:red;font-weight:bold" data-qtip="必填选项">*</span>'
            ]
        },
        {
            xtype: 'textarea',
            fieldLabel: '备注',
            itemId: 'descriptionId',
            name: 'description',
            beforeLabelTpl: [
                '<span  >&nbsp;&nbsp;</span>'
            ]
        }
    ],
    buttons: [
        {
            text: '保存',
            type: 'submit',
            handler: 'onSave',
            glyph: 0xf0c7
        },
        {
            text: '重置',
            glyph: 0xf0e2,
            handler: 'onAddReset'
        }
    ]
});