/**
 *
 */
Ext.define('kalix.demo.mainWork.view.dashboard.DashBoardExtend', {
    extend: 'Ext.dashboard.Dashboard',
    xtype: 'dashboardextend',
    requires: [
        'kalix.demo.mainWork.view.dashboard.WorkflowCategory'
    ],
    maxColumns:2,
    columnWidths: [ 0.5, 0.496 ],
    defaultContent: [],
    parts: {
        'workflowCategory': 'workflowCategory'
    },
    constructor: function () {
        var scope = this;
        var defaultContent = {};
        Ext.Ajax.request({
            async:false,
            scope: scope,
            //url: CONFIG.restRoot + "/camel/rest/dicts/list/workflow_category",
            url: CONFIG.restRoot + "/camel/rest/workflows/category",
            method: 'GET',
            success: function (response, opts) {
                var obj = Ext.decode(response.responseText);
                for(var i=0;i < obj.length;i++){
                    var title = obj[i].title;
                    var flowType = obj[i].id;
                    var newOjb = {
                        type: 'workflowCategory',
                        store:Ext.create('Ext.data.Store',{
                            storeId:'workflowCategory_'+flowType,
                            //storeId: Ext.create('kalix.demo.mainWork.store.MainWorkStore'),
                            autoLoad: false,
                            fields: ['id', 'title', 'imgurl', 'description'],
                            proxy: {
                                type: 'ajax',
                                url: CONFIG.restRoot + '/camel/rest/workflows?category=' + flowType,
                                reader: {
                                    rootProperty: 'data'
                                }
                            }
                        }),
                        columnIndex: i%2,
                        title: title,
                        responseIndex:i
                    };

                    scope.defaultContent.push(newOjb);
                }
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        },scope);

        this.callParent(arguments);

        //var itemsMark=[];

        for(var i=0;i<scope.defaultContent.length;++i){
            scope.defaultContent[i].store.on('load',function(target,records){
                if(records.length==0){
                    //itemsMark.push(this.itemIndex);
                    //this.scope.items.getAt(0).items.getAt(this.itemIndex).hide();
                    for(var colIndex=0;colIndex<this.scope.items.length;++colIndex){
                        if(this.scope.items.getAt(colIndex).xtype=='dashboard-column'){
                            for(var partIndex=0;partIndex<this.scope.items.getAt(colIndex).items.length;++partIndex){
                                var tempPart=this.scope.items.getAt(colIndex).items.getAt(partIndex);

                                if(tempPart.initialConfig._partConfig.responseIndex==this.itemIndex){
                                   // tempPart.hide();
                                    break;
                                }
                            }
                        }
                    }
                }

                //if(!this.scope.responseCount){
                //   this.scope.responseCount=1;
                //}
                //else{
                //    this.scope.responseCount+=1;
                //}
                //
                //if(this.scope.responseCount==this.scope.defaultContent.length){
                //    itemsMark.sort();
                //    itemsMark.reverse();
                //
                //    for(var ii=0;ii<itemsMark.length;++ii){
                //        this.scope.items.getAt(0).items;
                //    }
                //}
            },{scope:scope,itemIndex:i});
            scope.defaultContent[i].store.load();
        }
    }
});