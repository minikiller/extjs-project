/**
 * 权限控制工具条
 *
 * @author majian <br/>
 *         date:2015-8-14
 * @version 1.0.0
 */
Ext.define('kalix.view.components.common.SecurityToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.securityToolbar',
    xtype: 'securityToolbar',
    
    initComponent: function () {
      this.callParent(arguments);
      this.on('afterrender', this.initVerifyButton);
    },
    
    initVerifyButton : function(){
      var verifyItems = this.verifyItems;
      
      if(!this.verifyItems){ return; }
      
      var params = _.map(this.verifyItems, function(item){
        return item.permission;
      });
      
      params = params.join('_');
      var securityToolbar = this;
      
      //查询授权
      Ext.Ajax.request({
        url: "/kalix/camel/rest/system/applications/modules/children/buttons/" + params,
        method: "GET",
        callback: function (options, success, response) {
            var resp = Ext.JSON.decode(response.responseText);
            var respButtons = resp.buttons;

            securityToolbar.add(_.filter(verifyItems, function(item){
              return _.find(respButtons, function(button){
                return button.permission == item.permission;
              }).status;
            }));
        },
        failure: function(xhr, params) {
            console.log('Permission call failure!');
        }
      });
    }
});