/**
 * 用户新增表单
 *
 * @author majian <br/>
 *         date:2015-6-18
 * @version 1.0.0
 */

Ext.define('kalix.admin.user.view.UserForm', {
  extend : 'Ext.window.Window',
  requires : [
    'kalix.view.components.common.FormPanel',
    'kalix.admin.user.view.UserViewModel',
    'kalix.admin.user.controller.UserFormController'
  ],
  alias : 'widget.UserForm',
  viewModel : 'userViewModel',
  controller : 'userFormController',
  xtype : "UserForm",

  width : 400,
  border : false,
  modal : true,
  resizable : false,
  bind:{
    icon:'{icon}',
    title:'{title}'
  },
  items : [{
      xtype : 'baseForm',
      items : [{
          fieldLabel : '登录名',
          labelAlign : 'right',
          allowBlank : false,
          bind : {
            activeError : '{validation.loginName}',
            value : '{rec.loginName}'
          }
        }, {
          fieldLabel : '姓名',
          labelAlign : 'right',
          allowBlank : false,
          bind : {
            activeError : '{validation.name}',
            value : '{rec.name}'
          }
        }, {
          inputType : 'password',
          fieldLabel : '密码',
          labelAlign : 'right',
          allowBlank : false,
          bind : {
            activeError : '{validation.password}',
            value : '{rec.password}'
          }
        }, {
          inputType : 'password',
          fieldLabel : '确认密码',
          labelAlign : 'right',
          allowBlank : false,
          bind : {
            activeError : '{validation.confirmPassword}',
            value : '{rec.confirmPassword}'
          }
        }, {
          fieldLabel : '邮箱',
          labelAlign : 'right',
          allowBlank : false,
          bind : {
            activeError : '{validation.email}',
            value : '{rec.email}'
          }
        }, {
          fieldLabel : '电话号',
          labelAlign : 'right',
          bind : {
            activeError : '{validation.phone}',
            value : '{rec.phone}'
          }
        }, {
          fieldLabel : '手机号',
          labelAlign : 'right',
          allowBlank : false,
          bind : {
            //activeError : '{validation.mobile}',
            value : '{rec.mobile}'
          }
        }, {
          xtype : 'combobox',
          fieldLabel : '状态',
          labelAlign : 'right',
          editable : false,
          bind : {
            store : '{rec.availableOptions}',
            value : '{rec.available}'
          }
        }
      ],
      buttons : [{
          text : '保存',
          glyph : 'xf0c7@FontAwesome',
          handler : 'onSave'
        }, {
          text : '重置',
          glyph : 'xf0e2@FontAwesome',
          handler : 'onReset'
        }
      ]
    }
  ]
});