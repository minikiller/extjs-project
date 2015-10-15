Ext.define('kalix.core.view.MainTreelist', {
    extend: 'Ext.list.Tree',
    xtype: 'maintreelist',

    id: 'mainTreelist',
    
    constructor : function(){
      this.callParent(arguments);
      
      var navigationTreeStore = this.getStore('NavigationTree');
      var self = this;
      
      navigationTreeStore.on("beforeload", function(){
        
        navigationTreeStore.each(function(recorder){
          self.getItem(recorder).destroy();
        })
        
      }, this);
    }
});