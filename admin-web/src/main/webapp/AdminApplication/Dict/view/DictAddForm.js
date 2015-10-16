/**
 * 字典新增表单
 *
 * @author majian <br/>
 *         date:2015-6-18
 * @version 1.0.0
 */
Ext.define('kalix.AdminApplication.Dict.view.DictAddForm', {
    extend: 'Ext.FormPanel',
    requires: [
        'kalix.AdminApplication.Dict.view.DictViewModel',
        'kalix.AdminApplication.Dict.controller.DictFormController'
    ],
    alias: 'widget.dictAddForm',
    viewModel: {
        type: 'dictViewModel'
    },
    controller: 'dictFormController',
    xtype: "dictAddForm",
    layout:'form',
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
            fieldLabel: '<span style="color:red;font-weight:bold" data-qtip="必填选项">*</span>标签名',
            itemId: 'labelId',
            name: 'label',
            allowBlank: false,
            blankText: '标签名不能为空!',

        },
        {
            fieldLabel: '<span style="color:red;font-weight:bold" data-qtip="必填选项">*</span>数据值',
            itemId: 'valueId',
            name: 'value',
            allowBlank: false,
            blankText: '数据值不能为空!',

        },
        {
            fieldLabel: '<span style="color:red;font-weight:bold" data-qtip="必填选项">*</span>类型',
            itemId: 'typeId',
            name: 'type',
            allowBlank: false,
            blankText: '类型不能为空!',

        },
        {
            xtype: 'numberfield',
            fieldLabel: '<span style="color:red;font-weight:bold" data-qtip="必填选项">*</span>排序',
            itemId: 'sortId',
            name: 'sort',
            allowBlank: false,

        },
        {
            xtype: 'textarea',
            fieldLabel: '备注',
            itemId: 'descriptionId',
            name: 'description',
        }
    ],
    buttons: [
        {
            text: '保存',
            type: 'submit',
            handler: 'onSave'
        },
        {
            text: '重置',
            handler: 'onAddReset'
        }
    ]
});