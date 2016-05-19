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
        
        //title: 'Suggested Books',
        header: true,
        items: [
            {
                xtype: 'dataview',
                bodyPadding: 5,
                itemTpl: [],
                store:null,
                //store: {
                //    storeId: 'books',
                //    autoLoad: true,
                //    fields: ['id', 'title', 'imgurl', 'desc'],
                //    proxy: {
                //        type: 'ajax',
                //        url: 'demo/resources/images/senchabooks.json',
                //        reader: {
                //            rootProperty: 'books'
                //        }
                //    }
                //},
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
            '<img src="{imgurl}" height="80">',
            '<div class="detail">',
            '<span class="title">{title}</span></br>',
            '<span class="desc">{description}</span><a class="readmore" href="{readmore}" target="_blank">申请...</a></div>',
            '</div>');
        view.items[0].store = config.store;
        view.title = config.title;
        return view;
    }
});