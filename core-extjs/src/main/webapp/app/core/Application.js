/**
 * 主应用程序
 *
 * date:2015-10-26
 */

Ext.define('kalix.core.Application', {
  extend: 'Ext.app.Application',

  name: 'kalix',

  stores: [
    'kalix.core.store.NavigationTree',
    'kalix.core.store.MainToolbar'
  ],

  models: [],

  defaultToken: 'AdminApplication',

  launch: function () {
    // TODO - Launch the application
  }
});
