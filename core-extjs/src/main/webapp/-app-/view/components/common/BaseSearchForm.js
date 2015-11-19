/**
 * @author chenyanxu
 */

Ext.define('kalix.view.components.common.BaseSearchForm', {
    extend: 'Ext.form.Panel',
    requires: [
        'kalix.controller.BaseSearchFormController'
    ],
    alias: 'widget.baseSearchForm',
    xtype: 'baseSearchForm',
    storeId:'',
    controller: {
        type:'baseSearchFormController'
    },
    bodyPadding: 10,
    layout: 'column',
    margin: 10,
    defaults:{border:0},
    buttons: [{
        text: '关闭',
        glyph: 'xf00d@FontAwesome',
        handler: function () {
            this.up('.window').close();
        }
    }
    ],
    listeners:{
        beforerender:function(){
           this.add({
                   xtype: 'button',
                   text: '查询',
                   margin: '0 0 0 10',
                   handler: 'onSearch',
                   glyph: 'xf002@FontAwesome',
               },
               {
                   xtype: 'button',
                   text: '重置',
                   margin: '0 0 0 10',
                   glyph: 'xf0e2@FontAwesome',
                   handler:'onReset'
               });
        }
    }
});
