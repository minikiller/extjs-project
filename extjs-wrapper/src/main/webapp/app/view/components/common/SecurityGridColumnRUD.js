/**
 * 权限控制工具条
 *
 * @author majian <br/>
 *         date:2015-8-14
 * @version 1.0.0
 */
Ext.define('kalix.view.components.common.SecurityGridColumnRUD', {
    extend: 'Ext.grid.column.Action',
    alias: 'widget.securityGridColumnRUD',
    xtype: 'securityGridColumnRUD',
    permissions: [],
    header: '操作',
    hideColumnFun: function (value, meta, record) {
        return 'x-hide-grid-column';
    },
    items: [
        {
            icon: "resources/images/read.png",
            tooltip: '查看',
            handler: 'onView'
        },
        {
            icon: "resources/images/edit.png",
            tooltip: '编辑',
            handler: 'onEdit'
        }, {
            icon: "resources/images/delete.png",
            tooltip: '删除',
            handler: 'onDelete'
        }],
    listeners: {
        beforerender: function () {
            var scope = this;

            _.forEach(scope.items, function (item) {
                item.getClass = scope.hideColumnFun;
            });

            if (this.permissions.length > 0) {
                var params = this.permissions.join('_');
                Ext.Ajax.request({
                    url: "/kalix/camel/rest/system/applications/modules/children/buttons/" + params,
                    method: "GET",
                    async: false,
                    callback: function (options, success, response) {
                        var resp = Ext.JSON.decode(response.responseText);
                        var respButtons = resp.buttons;

                        _.forEach(respButtons, function (item) {
                            if (item.status) {
                                var permissionSplit = item.permission.split(':');

                                switch (permissionSplit[permissionSplit.length - 1]) {
                                    case 'view':
                                        scope.items[0].getClass = null;
                                        break;
                                    case 'edit':
                                        scope.items[1].getClass = null;
                                        break;
                                    case 'delete':
                                        scope.items[2].getClass = null;
                                        break;
                                }
                            }
                        });
                    },
                    failure: function (xhr, params) {
                        console.log('Permission call failure!');
                    }
                });
            }
        }
    }
});