Ext.define('kalix.core.store.MainToolbar', {
    extend: 'Ext.data.Store',
    storeId: 'MainToolbar',

    state: {
        hashInit: false
    },

    proxy: {
        type: 'ajax',
        url: '/kalix/camel/rest/system/applications',
        //url : '/resources/mock/applications.json',
        reader: {
            type: 'json',
            rootProperty: ''
        }
    },

    load: function () {
        if (!this.state.hasInit) {
            this.callParent(arguments);
            this.state.hasInit = true;
        }
    }
});
