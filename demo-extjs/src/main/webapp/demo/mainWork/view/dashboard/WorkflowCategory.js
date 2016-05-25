/**
 *
 */
Ext.define('kalix.demo.mainWork.view.dashboard.WorkflowCategory', {
    requires: [
        'Ext.view.View',
        'Ext.XTemplate',
        'Ext.scroll.Scroller'
    ],
    extend: 'Ext.dashboard.Part',
    alias: 'part.workflowCategory',
    title:'',
    store:null,
    viewTemplate: {
        height: 300,
        layout: 'fit',
        header: true,
        items: [
            {
                xtype: 'dataview',
                bodyPadding: 5,
                itemTpl: [],
                store:null,
                itemSelector: 'div.thumb-wrap'
            }
        ]
    },

    createView: function (config) {
        var view = this.callParent(arguments);
        view.scrollable = Ext.scroll.Scroller.create({
            y: true,x:false
        });
        view.items[0].itemTpl = new Ext.XTemplate(
            '<div class="thumb-wrap">',
            '<tpl if="key.indexOf(\'.png\') &gt;-1">',
            '<img src="{key}" height="80">',
            '</tpl>',
            '<div class="detail">',
            '<span class="title">{name}</span></br>',
            '<span class="desc">{description}</span>' +
            '<input type="button" onclick="kalix.getApplication()._mainView.controller.redirectTo(\'message/receiver\')">申请...</input></div>',
            '</div>');
        view.items[0].store = config.store;
        view.title = config.title;
        return view;
    }
});