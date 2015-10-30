/**
 * 用户视图模型
 *
 * @author majian <br/>
 *         date:2015-7-6
 * @version 1.0.0
 */
Ext.define('kalix.admin.user.view.UserViewModel', {
  extend : 'Ext.app.ViewModel',
  alias : 'viewmodel.userViewModel',
  requires : [
    'kalix.admin.user.model.UserModel'
  ],
  data : {
    url : '/kalix/camel/rest/users',
    
    rec : Ext.create('kalix.admin.user.model.UserModel'),
    validation : {}  //验证错误信息
  }
});