/**
 * @author chenyanxu
 */
Ext.define('kalix.view.components.common.SecurityGridColumnCommon', {
    extend: 'Ext.grid.column.Action',
    alias: 'widget.securityGridColumnCommon',
    xtype: 'securityGridColumnCommon',
    header: '操作',
    hideColumnFun:function(value, meta, record) {
        return 'x-hide-grid-column';
    },
    listeners:{
        beforerender:function(){
            var scope=this;
            var params = _.map(scope.items, function(item){
                return item.permission;
            });

            params = params.join('_');
            //查询授权
            Ext.Ajax.request({
                url: "/kalix/camel/rest/system/applications/modules/children/buttons/" + params,
                method: "GET",
                async:false,
                callback: function (options, success, response) {
                    var resp = Ext.JSON.decode(response.responseText);
                    var respButtons = resp.buttons;

                    _.forEach(scope.items, function(item){
                        var findObj=_.find(respButtons, function(button){
                            return button.permission == item.permission;
                        });

                        if(!findObj.status){
                            item.getClass=scope.hideColumnFun;
                        }
                    });

                },
                failure: function(xhr, params) {
                    console.log('Permission call failure!');
                }
            });
        }
    }
});