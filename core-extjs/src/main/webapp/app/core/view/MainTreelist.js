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
      });

      navigationTreeStore.treeSelInfo.tree=self;
    }, this);
    
    navigationTreeStore.on("load", function () {
      _.each(last, function(item){
        var destoryItem=self.getItem(item);

        if(destoryItem!=null){
          destoryItem.destroy();
        }
      });

      navigationTreeStore.each(function (recorder) {
       var item = self.getItem(recorder);

        if(navigationTreeStore.treeSelInfo.selected)
        {
          alert(navigationTreeStore.treeSelInfo.level1);
        }
      });

    }, this);
    
  }
});
