Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux', '/core-web/ext-5.1.0/ux');

Ext.application({
    name: 'Kalix',
    appFolder: 'app',
    autoCreateViewport: 'Kalix.view.main.Main'
});
