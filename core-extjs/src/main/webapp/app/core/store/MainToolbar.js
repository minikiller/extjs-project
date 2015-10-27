/**
 * 主工具条 store
 *
 * date:2015-10-26

 主工具条只初始化一次
 */

Ext.define('kalix.core.store.MainToolbar', {
  extend: 'Ext.data.Store',
  storeId: 'MainToolbar',

  state: {
    hashInit: false
  },

  proxy: {
    type: 'ajax',
    url: '/kalix/camel/rest/system/applications',
    reader: {
      type: 'json',
      rootProperty: ''
    }
  },

  load: function () {
    if (!this.state.hasInit) {
      this.callParent(arguments);
      this.state.hasInit = true;
    }
  }
});
