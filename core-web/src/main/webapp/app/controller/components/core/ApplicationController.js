/**
 *应用组件控制器
 *
 * @author majian <br/>
 *         date:2015-6-18
 * @version 1.0.0
 */
Ext.define('Kalix.controller.components.core.ApplicationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.applicationComponentController',
    init: function () {

    },
    onRender: function () {
        var applicationMenu = Ext.getCmp("application");
        var loadMask = new Ext.LoadMask({
            msg: '加载中...',
            target: applicationMenu
        });
        loadMask.show();
        Ext.Ajax.request({ //初始化应用组件
            url: this.getView().getViewModel().get("application.url"),
            //url :"/resources/datas/applications.json",
            method: "GET",
            callback: function (options, success, response) {
                var applications = Ext.JSON.decode(response.responseText);
                if (applications && applications.length > 0) {
                    for (var i = 0; i < applications.length; i++) {
                        applicationMenu.add(Ext.create('Ext.Panel', {
                            id: applications[i].id,
                            title: applications[i].title,
                            icon: applications[i].icon,
                            closable: false
                        }));
                    }
                    applicationMenu.setActiveTab(0);
                }
                loadMask.hide();
            }
        });
    },
    onTabchange: function (tabs, newTab, oldTab) {
        var applicationId = newTab.id;
        //追加模块列表
        if (newTab) {
            var menuPanel = Ext.getCmp("leftPanel");
            menuPanel.removeAll();
            var loadMask = new Ext.LoadMask({
                msg: '加载中...',
                target: menuPanel
            });
            loadMask.show();
            Ext.Ajax.request({ //初始化选项卡
                //url: this.getView().getViewModel().get("module.url") + applicationId + ".json",
                url: this.getView().getViewModel().get("module.url") + "app1.json",
                //params : "appId="+newTab.id,
                method: "GET",
                callback: function (options, success, response) {
                    var modules = Ext.JSON.decode(response.responseText);
                    if (modules && modules.length > 0) {
                        for (var i = 0; i < modules.length; i++) {
                            if (modules[i]) {
                                menuPanel.add(Ext.create("Kalix.view.components.core.Module", modules[i]));
                            }
                        }
                    }
                    loadMask.hide();
                }
            });
        }
    }
});