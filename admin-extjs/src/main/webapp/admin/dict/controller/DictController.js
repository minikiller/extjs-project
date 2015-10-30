/**
 * 字典模块控制器
 *
 * @author majian <br/>
 *         date:2015-6-18
 * @version 1.0.0
 */
Ext.define('kalix.admin.dict.controller.DictController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dictController',
    requires: [
        'kalix.view.components.common.PagingToolBar',
        'kalix.admin.dict.view.DictGrid'
    ],
    /**
     * 初始化面板.
     * @returns {Ext.panel.Panel}
     */
    onInitPanel: function () {

        var panel = Ext.create("Ext.panel.Panel", {
            border: false,
            autoScroll: true,
            height: document.body.clientHeight - 110, //客户端屏幕高度-底部-工具条以及选项卡
            items: [this.onInitSearchPanel(), this.onInitDataGrid()]
        })

        return panel;
    },
    onInitSearchPanel: function () {
        var formPanelRow1 = Ext.create("Ext.FormPanel", {
            labelWidth: 35,
            layout: 'column',
            floating: false,
            bodyStyle: 'padding:5px 5px 0',
            draggable: false,
            defaults: {
                width: 230
            },
            defaultType: 'textfield',
            items: [{
                fieldLabel: '用户名',
                name: 'username',
                allowBlank: true,
                emptyText: "请输入用户名",
                itemId: 'username'
            }, {
                fieldLabel: '昵称',
                name: 'nickname',
                allowBlank: true,
                emptyText: "请输入用户昵称",
                itemId: 'nickname'
            }, {
                xtype: 'combobox',
                fieldLabel: '性别',
                emptyText: '请选择操作员性别',
                //store : store_sex,
                displayField: 'text',
                valueField: 'sex',
                name: 'sex',
                itemId: 'sex',
                allowBlank: true
            }, {
                fieldLabel: '注册时间从',
                name: 'registDate',
                xtype: 'datefield',
                readOnly: false,
                format: 'Y-m-d H:i:s',
                allowBlank: true,
                itemId: 'registDateFrom'
            }, {
                fieldLabel: '到',
                name: 'registDate',
                xtype: 'datefield',
                readOnly: false,
                format: 'Y-m-d H:i:s',
                allowBlank: true,
                itemId: 'registDateTo'
            }]
        });
        var formPanel = Ext.create('Ext.form.FormPanel', {
            border: false,
            layout: 'form',
            labelWidth: 65,
            labelAlign: 'right',
            items: [formPanelRow1],
            buttonAlign: 'center',

            buttons: [{
                text: '查询',
                glyph: 0xf002,
                type: 'submit',
                handler: function () {
                    //store.on('beforeload', function () {
                    //    store.proxy.extraParams = {
                    //        username_LIKE_STRING: Ext.getCmp('username')
                    //            .getValue(),
                    //        nickname_LIKE_STRING: Ext.getCmp('nickname')
                    //            .getValue(),
                    //        sex_EQ_INT: Ext.getCmp('sex').getValue(),
                    //        registDate_GT_DATE: Ext.getCmp('registDateFrom')
                    //            .getValue(),
                    //        registDate_LT_DATE: Ext.getCmp('registDateTo')
                    //            .getValue()
                    //    };
                    //});
                    store.load({
                        params: {
                            start: 0,
                            limit: 10
                        }
                    });
                }
            }, {
                text: '重置',
                glyph: 'xf0e2@FontAwesome',
                handler: function () {
                    searchForm.getForm().reset();
                }
            }]
        });
        var searchPanel = Ext.create("Ext.panel.Panel", {
            title: '条件查询',
            border: false,
            items: [formPanel]
        });

        return searchPanel;

    },
    /**
     * 初始化查询面板.
     * @returns {Ext.panel.Panel}
     */
    /* onInitSearchPanel:function(){
     var formPanelRow1 = {
     border: false,
     layout: 'column',
     items: [{
     //columnWidth: .2,
     border: false,
     layout: 'form',
     items: [{
     xtype: 'textfield',
     fieldLabel: '标签',
     id: "admin_dict_labelId",
     name: 'username'
     }]
     }, {
     //columnWidth: .2,
     border: false,
     layout: 'form',
     items: [{
     xtype: 'textfield',
     fieldLabel: '数据值',
     id: "admin_dict_valueId",
     name: 'name'
     }]
     },
     {
     //columnWidth: .2,
     border: false,
     //layout: 'form',
     items: [{
     xtype: 'submit',
     glyph : 0xf002,
     text: '查询',
     handler: function () {
     }
     }]
     }]
     }];

     //form
     var formPanel =Ext.create('Ext.form.FormPanel',{
     border: false,
     layout: 'form',
     labelWidth: 65,
     labelAlign: 'right',
     items: [formPanelRow1],
     buttonAlign: 'center'
     });


     var searchPanel = Ext.create("Ext.panel.Panel", {
     title: '条件查询',
     border: false,
     items: [formPanel]
     });

     return searchPanel;
     },*/
    /**
     * 初始化数据表格.
     * @returns {Ext.panel.Panel}
     */
    onInitDataGrid: function () {
        var dataStore = Ext.create("kalix.admin.dict.store.DictStore");
        var dataGird = Ext.create("kalix.admin.dict.view.DictGrid", {
            store: dataStore,
            height: document.body.clientHeight - 210,
            bbar: [{
                xtype: 'pagingToolBarComponent',
                store: dataStore
            }]
        });
        return dataGird;
    }
});