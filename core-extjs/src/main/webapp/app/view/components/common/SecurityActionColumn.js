/**
 * 权限控制工具条
 *
 * @author majian <br/>
 *         date:2015-8-14
 * @version 1.0.0
 */
Ext.define('kalix.view.components.common.SecurityActionColumn', {
    extend: 'Ext.grid.column.Action',
    alias: 'widget.securityActionColumn',
    xtype: 'securityActionColumn',
    permissions:[],
    header: '操作',
    items: [
    {
        icon: "resources/images/read.png",
        tooltip: '查看',
        handler: 'onView',
        getClass: function(value, meta, record) {
            return 'x-hide-grid-column';
        }
    },
    {
        icon: "resources/images/edit.png",
        tooltip: '编辑',
        handler: 'onEdit',
        getClass: function(value, meta, record) {
            return 'x-hide-grid-column';
        }
    }, {
        icon: "resources/images/delete.png",
        tooltip: '删除',
        handler: 'onDelete',
        getClass: function(value, meta, record) {
            return 'x-hide-grid-column';
        }
    }],
    listeners:{
        beforerender:function(){
            var params = this.permissions.join('_');
            var scope=this;
            Ext.Ajax.request({
                url: "/kalix/camel/rest/system/applications/modules/children/buttons/" + params,
                method: "GET",
                async:false,
                callback: function (options, success, response) {
                    var resp = Ext.JSON.decode(response.responseText);
                    var respButtons = resp.buttons;

                    _.forEach(respButtons,function(item){
                        if(item.status){
                            var permissionSplit=item.permission.split(':');

                            switch(permissionSplit[permissionSplit.length-1]){
                                case 'read':
                                    scope.items[0].getClass=null;
                                    break;
                                case 'update':
                                    scope.items[1].getClass=null;
                                    break;
                                case 'delete':
                                    scope.items[2].getClass=null;
                                    break;
                            }
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