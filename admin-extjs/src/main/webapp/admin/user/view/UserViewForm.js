/**
 * 用户新增表单
 *
 * @author majian <br/>
 *         date:2015-6-18
 * @version 1.0.0
 */

Ext.define('kalix.admin.user.view.UserViewForm', {
  extend : 'Ext.window.Window',
  requires : [
    'kalix.admin.user.view.UserViewModel',
    'kalix.admin.user.controller.UserFormController'
  ],
  alias : 'widget.userViewForm',
  viewModel : 'userViewModel',
  controller : 'userFormController',
  xtype : "userViewForm",

  width : 400,
  border : false,
  modal : true,
  resizable : false,
  icon : 'admin/resources/images/user.png',
  title : '查看用户',

  items : [{
      xtype : 'form',
      defaultType : 'displayfield',
      bodyPadding : 10,
      buttonAlign : "center",
      items : [{
          fieldLabel : '登录名',
          labelAlign : 'right',
          bind : {
            value : '{rec.loginName}'
          }
        }, {
          fieldLabel : '姓名',
          labelAlign : 'right',
          bind : {
            value : '{rec.name}'
          }
        }, {
          fieldLabel : '邮箱',
          labelAlign : 'right',
          bind : {
            value : '{rec.email}'
          }
        }, {
          fieldLabel : '电话号',
          labelAlign : 'right',
          bind : {
            value : '{rec.phone}'
          }
        }, {
          fieldLabel : '手机号',
          labelAlign : 'right',
          bind : {
            value : '{rec.mobile}'
          }
        }, {  
          fieldLabel : '状态',
          labelAlign : 'right',
          bind : '{rec.availableText}'
        }
      ],
      buttons : [{
          text : '关闭',
          glyph : 'xf00d@FontAwesome',
          handler : function () { this.up('.window').close(); }
        }
      ]
    }
  ]
});