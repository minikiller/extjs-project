/**
 * 用户表格控制器
 *
 * @author majian <br/>
 *         date:2015-6-18
 * @version 1.0.0
 */
Ext.define('kalix.admin.user.controller.UserGridController', {
  extend : 'Ext.app.ViewController',
  requires : [
    'kalix.core.Notify',
    'kalix.admin.user.view.UserForm',
    'kalix.admin.user.view.UserViewModel'
  ],
  alias : 'controller.userGridController',
  /**
   * 查看操作.
   */
  onView : function (target, event) {
    var grid = target.findParentByType('grid');
    var selModel = grid.getSelectionModel();
    if (selModel.hasSelection()) {
      var view = Ext.create('kalix.admin.user.view.UserViewForm');
      var viewModel = view.lookupViewModel();
      viewModel.set('rec', selModel.getSelection()[0]);
      view.show();
    } else {
      Ext.Msg.alert(CONFIG.ALTER_TITLE_ERROR, "请选择要查看的记录！");
    }
  },
  
  /**
   * 打开新增操作.
   */
  onAdd : function () {
    var view=Ext.create('kalix.admin.user.view.UserForm');
    var viewModel = view.lookupViewModel();
    viewModel.set('rec', Ext.create('kalix.roffice.news.model.NewsModel'));
    viewModel.set('icon','admin/resources/images/user_add.png');
    viewModel.set('title','新增用户');
    view.show();
  },
  /**
   * 打开编辑操作.
   * @param grid
   * @param rowIndex
   * @param colIndex
   */
  onEdit : function (target, event) {
    var grid = target.findParentByType('grid');
    var selModel = grid.getSelectionModel();
    if (selModel.hasSelection()) {
      var rec = selModel.getSelection()[0].clone();
      rec.set('password', '');
      
      var view = Ext.create('kalix.admin.user.view.UserForm');
      var viewModel = view.lookupViewModel();

      viewModel.set('rec', rec);
      viewModel.set('icon','admin/resources/images/user_edit.png');
      viewModel.set('title','修改用户');
      view.show();
    } else {
      Ext.Msg.alert(CONFIG.ALTER_TITLE_ERROR, "请选择要编辑的记录！");
    }
  },

  /**
   * 删除单个操作.
   * @param grid
   * @param rowIndex
   * @param colIndex
   */
  onDelete : function (target, event) {
    var grid = target.findParentByType('grid');
    var selModel = grid.getSelectionModel();
    if (selModel.hasSelection()) {
      var deleteUrl = this.getViewModel().get("url");
      var ids = _.reduce(selModel.getSelection(), function (memo, rec) {
          memo.push(rec.get('id'));
          return memo;
        }, []).join('_');

      Ext.Msg.confirm("警告", "确定要删除吗？", function (button) {
        if (button == "yes") {
          Ext.Ajax.request({
            url : deleteUrl + "?id=" + ids,
            method : 'DELETE',
            success : function (response, opts) {
              var res = Ext.JSON.decode(response.responseText);
              if (res.success) {
                kalix.getApplication().getStore('userStore').reload();
                kalix.core.Notify.success( res.msg,CONFIG.ALTER_TITLE_SUCCESS);
              } else {
                Ext.Msg.alert(CONFIG.ALTER_TITLE_FAILURE, res.msg);
              }
            },
            failure : function (response, opts) {
              Ext.Msg.alert(CONFIG.ALTER_TITLE_FAILURE, res.msg);
            }
          });
        }
      });
    } else {
      Ext.Msg.alert(CONFIG.ALTER_TITLE_ERROR, "请选择要删除的记录！");
    }
  }

});
