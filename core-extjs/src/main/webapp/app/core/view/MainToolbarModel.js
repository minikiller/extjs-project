/**
 * ����������ģ��
 *
 * date:2015-10-26
 */

Ext.define('kalix.core.view.MainToolbarModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.maintoolbar',

    constructor : function(){
      this.callParent(arguments);

      var mainToolbarStore = Ext.getStore('MainToolbar');
      mainToolbarStore.on("load", function(){
        this.updateItems(mainToolbarStore.getData());
      }, this);
    },
    
    updateItems : function(modelItems){
      var items = [];
      modelItems.each(function(item, index){
        items.push(item.getData());
      });
      
      this.set('items', items);
    }
});
