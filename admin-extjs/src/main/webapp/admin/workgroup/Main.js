/**
 * 用户组件
 *
 * @author majian <br/>
 *         date:2015-6-18
 * @version 1.0.0
 */
Ext.define('kalix.admin.workgroup.Main', {
  extend : 'Ext.container.Container',
  requires : [
    'kalix.admin.workgroup.store.WorkGroupStore',  //用户模型集合
    'kalix.admin.workgroup.view.WorkGroupGrid',
    'kalix.admin.workgroup.controller.WorkGroupController'
  ],
  controller: 'workGroupController',

  items : [{
      xtype : 'form',
      title : '工作组查询',
      bodyPadding : 10,
      layout : 'column',
      margin : 10,
      
      method : "POST",
      url : 'login',
      
      items : [{
          xtype : 'textfield',
          fieldLabel : '登录名',
          labelAlign : 'right',
          labelWidth : 60,
          width : 200,
          name : 'loginName'
        }, {
          xtype : 'textfield',
          fieldLabel : '姓名',
          labelAlign : 'right',
          labelWidth : 40,
          width : 200,
          name : 'name'
        }, {
          xtype : 'combobox',
          fieldLabel : '状态',
          labelAlign : 'right',
          labelWidth : 40,
          editable : false,
          name : 'available',
          value : '-1',
          store : [
            ['-1', '全部'],
            ['1', '启用'],
            ['0', '停用']
          ]
        }, {
          xtype : 'button',
          text : '查询',
          margin: '0 0 0 10',
          handler : 'onSearch',
          glyph : 'xf002@FontAwesome',
        }
      ]
    }, {
      xtype : 'workGroupGridPanel',
      id : 'workGroupGridPanel',
      title : '工作组列表',
      margin : 10,
      store : {
        type : 'workGroupStore'
      }
    }
  ]
});
