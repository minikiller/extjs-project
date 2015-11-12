/**
 * @author chenyanxu
 *
 */

Ext.define('kalix.store.BaseStore', {
  extend : 'Ext.data.Store',
  listeners:{
    //listener function for shiro session timeout
    load:function(target, records, successful, eOpts ){
      if('login'==Ext.JSON.decode(eOpts.getResponse().responseText).message){
        location.reload();
      }
    }
  }
});
