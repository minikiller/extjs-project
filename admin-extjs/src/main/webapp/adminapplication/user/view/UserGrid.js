/**
 * 用户表格
 * @author majian <br/>
 *         date:2015-7-3
 * @version 1.0.0
 */
Ext.define('kalix.adminapplication.user.view.UserGrid', {
  extend : 'Ext.grid.Panel',
  requires : [
    'kalix.adminapplication.user.view.UserViewModel',
    'kalix.adminapplication.user.controller.UserGridController',
    'kalix.view.components.common.SecurityToolbar'
  ],
  alias : 'widget.userGrid',
  xtype : 'userGridPanel',
  controller : 'userGridController',
  viewModel : 'userViewModel',
  autoLoad : true,
  stripeRows : true,

  columns : [{
      text : '编号',
      dataIndex : 'id',
      width : 40
    }, {
      text : '登录名',
      dataIndex : 'loginName',
      width : 80
    }, {
      text : '姓名',
      dataIndex : 'name',
      width : 60
    }, {
      text : '邮箱',
      dataIndex : 'email',
      width : 60
    }, {
      text : '电话',
      dataIndex : 'phone',
      width : 60
    }, {
      text : '手机',
      dataIndex : 'mobile',
      width : 60
    }, {
      text : '创建人',
      dataIndex : 'createBy',
      width : 60
    }, {
      text : '创建日期',
      dataIndex : 'creationDate',
      width : 120,
      renderer : function (value) {
        var createDate = new Date(value);
        return createDate.format("yyyy-MM-dd hh:mm:ss");
      }
    }, {
      text : '更新人',
      dataIndex : 'updateBy',
      width : 60
    }, {
      text : '更新日期',
      dataIndex : 'updateDate',
      width : 120,
      renderer : function (value) {
        var updateDate = new Date(value);
        return updateDate.format("yyyy-MM-dd hh:mm:ss");
      }
    }, {
      text : '最后登陆IP',
      dataIndex : 'loginIp',
      width : 70
    }, {
      text : '登陆日期',
      dataIndex : 'loginDate',
      width : 120,
      renderer : function (value) {
        var loginDate = new Date(value);
        return loginDate.format("yyyy-MM-dd hh:mm:ss");
      }
    }, {
      text : '用户状态',
      dataIndex : 'available',
      width : 60,
      renderer : function (value) {
        if (value != null && value == "1") {
          return "启用";
        }
        return "停用";
      }
    }
  ],

  tbar : {
    xtype : 'securityToolbar',
    
    //无需授权的按钮
    items : [
      {
        text : '查看',
        xtype : 'button',
        permission : 'admin:sysModule:permissionControl:userMenu:add',
        icon : 'resources/images/user_add.png',
        handler : 'onView'
      },{
        text : '新增',
        xtype : 'button',
        permission : 'admin:sysModule:permissionControl:userMenu:add',
        icon : 'resources/images/user_add.png',
        handler : 'onAdd'
      }
    ],
    
    //需要验证权限后添加的按钮
    verifyItems : [{
        text : '修改',
        xtype : 'button',
        permission : 'admin:sysModule:permissionControl:userMenu:update',
        icon : "resources/images/user_edit.png",
        handler : 'onEdit'
      }, {
        text : '删除',
        xtype : 'button',
        permission : 'admin:sysModule:permissionControl:userMenu:delete',
        icon : "resources/images/user_delete.png",
        handler : 'onDelete'
      }
    ]
  },

  /*
  grid 组件不自动绑定与 grid 相关的翻页工具条的 store 配置项
  需要手动指定工具条的 store
   */
  bbar : [{
      id : 'workgroup-pagingtoolbar',
      xtype : 'pagingtoolbar',
      border : false,
      padding : 0,
      listeners : {
        afterrender : function (c, obj) {
          this.setConfig('store', kalix.getApplication().getStore('userStore'));
        }
      }
    }
  ]
});
