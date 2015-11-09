Ext.define('kalix.core.view.MainTreelist', {
  extend : 'Ext.list.Tree',
  xtype : 'maintreelist',

  constructor : function () {
    this.callParent(arguments);

    
    var navigationTreeStore = this.getStore('NavigationTree');
    var self = this;
    var last = [];
    
    navigationTreeStore.on("beforeload", function () {
      last = [];
      navigationTreeStore.each(function (recorder) {
        last.push(recorder);
      })

    }, this);
    
    navigationTreeStore.on("load", function () {
      _.each(last, function(item){
        self.getItem(item).destroy();
      });
    }, this);
    
  }
});
