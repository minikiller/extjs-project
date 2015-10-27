/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('kalix.core.view.ProfilebarModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.profilebar',

  data: {
    user: {
      name: Ext.util.Cookies.get('currentUserName') || '系统管理员',
      quit: "/kalix/logout"
    }
  }
});
