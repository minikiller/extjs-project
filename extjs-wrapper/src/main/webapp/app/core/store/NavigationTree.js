/**
 * 左侧导航 store
 *
 * date:2015-10-26

主工具条只初始化一次
 */

Ext.define('kalix.core.store.NavigationTree', {
  extend : 'kalix.store.BaseTreeStore',

  storeId : 'NavigationTree',

  state : {
    hashToken : null
  },

  baseUrl: CONFIG.restRoot + '/camel/rest/system/applications/',
  treeSelInfo:{
    tree:null,
    selected:false,
    level1:'',
    level2:''
  },
  proxy : {
    type : 'ajax',
    url : '',
    reader : {
      type : 'json',
      rootProperty : ''
    }
  },

  load : function (options) {
    if (this.state.hashToken != options.hashToken) {
      this.proxy.url = this.baseUrl + options.hashToken;
      this.state.hashToken = options.hashToken;
      this.callParent(arguments);
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
