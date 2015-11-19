/**
 * @author chenyanxu
 *
 */

Ext.define('kalix.store.BaseStore', {
  extend : 'Ext.data.Store',
  requires: ['kalix.core.Notify'],
  autoLoad: true,
  pageSize: 10,
  proxyUrl:'',
  constructor: function () {
    this.callParent(arguments);
    if(this.proxyUrl!='')
    {
      this.proxy.url=this.proxyUrl;
    }
  },
  listeners:{
    //listener function for shiro session timeout
    load:function(target, records, successful, eOpts ){
      var rtnJson=Ext.JSON.decode(eOpts.getResponse().responseText);

      if(rtnJson.message!=undefined &&
          'login'==rtnJson.message){
        location.reload();
      }
    }
  },
  proxy: {
    type: 'rest',
    url: '',
    actionMethods:{
      create: 'POST',
      read: 'GET',
      update: 'PUT',
      destroy: 'DELETE'
    },
    reader:{
      rootProperty:'data',
      totalProperty:'totalCount'
    }
  }
});
