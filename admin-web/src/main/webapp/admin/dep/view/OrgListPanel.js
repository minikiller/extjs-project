/**
 * 机构列表
 * @author majian <br/>
 *         date:2015-7-23
 * @version 1.0.0
 */
Ext.define('Kalix.admin.dep.view.OrgListPanel', {
    extend: 'Ext.tree.Panel',
    requires: [
        'Kalix.admin.org.viewModel.OrgViewModel',
        'Kalix.admin.org.controller.OrgGridController'
    ],
    alias: 'widget.orgListPanel',
    id: "orgListPanel",
    xtype: 'orgListPanel',
    controller: 'orgGridController',
    viewModel: {
        type: 'orgViewModel'
    },
    region: "west",
    title:'机构列表',
    width:200,
    collapsible: true,
    autoScroll : true,
    border:false,
    /*root:{
        id:'-1',
        name:'根机构'
    },*/
    rootVisible : false,
    autoScroll : true,
    listeners: {
        itemClick:function (view, record, item, index, e) {
            var grid = Ext.getCmp("depDataGrid");
            grid.orgId=record.data.id;
            grid.orgName=record.data.name;
            var store = grid.getStore();
            store.setProxy({
                type: "ajax",
                url: '/kalix/camel/rest/deps/org/'+record.data.id
            });
            store.reload();
        }
    },
    tbar: [
        {
            text: '刷新', icon: 'admin/resources/images/script_go.png',
            handler: function(){
                Ext.getCmp("orgListPanel").getStore().reload();
            }
        },
        {
            text: '展开', icon: 'admin/resources/images/arrow_down.png',
            handler: function(){
                Ext.getCmp("orgListPanel").expandAll(function() {
                });
            }
        },
        {
            text: '收起', icon: 'admin/resources/images/arrow_up.png',
            handler: function(){
                Ext.getCmp("orgListPanel").collapseAll(function() {
                });
            }
        }]
});