/**
 * 左侧导航 store
 *
 * date:2015-10-26

主工具条只初始化一次
 */

Ext.define('kalix.core.store.NavigationTree', {
  extend : 'Ext.data.TreeStore',

  storeId : 'NavigationTree',

  state : {
    hashToken : null
  },

  baseUrl : '/kalix/camel/rest/system/applications/',

  proxy : {
    type : 'ajax',
    url : '',
    reader : {
      type : 'json',
      rootProperty : ''
    }
  },

  load : function (hashToken) {
    if (this.state.hashToken != hashToken) {
      this.proxy.url = this.baseUrl + hashToken;
      this.callParent(arguments);
      this.state.hashToken = hashToken;
    }
  },

  root : {
    expanded : true,
    children : []
  },
  fields : [{
      name : 'text'
    }
  ]
});
