/**
 * @author chenyanxu
 */
Ext.define('kalix.admin.dict.component.DictFormCombobox', {
    extend: 'Ext.form.field.ComboBox',
    requires:[
        //'kalix.admin.dict.store.DictNoPageStore'
    ],
    alias: 'widget.dictFormCombobox',
    editable: false,
    xtype: 'dictFormCombobox',
    queryMode: 'local',
    valueField: 'value',
    displayField: 'label',
    queryParam: 'name',
    listeners:{
        beforerender:function(){
            var store=kalix.getApplication().getStore('dictNoPageStore');
            var tempStore=Ext.create('Ext.data.Store');

            store.filter('type',this.dictType);
            tempStore.setData(store.getData().clone());
            this.setStore(tempStore);

            return true;
        }
    }
});