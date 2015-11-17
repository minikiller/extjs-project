/**
 * @author chenyanxu
 */
Ext.define('kalix.admin.dict.component.DictCombobox', {
    extend: 'Ext.form.field.ComboBox',
    requires:[
        //'kalix.admin.dict.store.DictNoPageStore'
    ],
    alias: 'widget.dictCombobox',
    editable: false,
    xtype: 'dictCombobox',
    queryMode: 'local',
    valueField: 'value',
    displayField: 'label',
    selectOnFocus:true,
    typeAhead:true,
    queryParam: 'name',
    listeners:{
        beforerender:function(){
            var store=kalix.getApplication().getStore('dictNoPageStore');
            var tempStore=Ext.create('kalix.store.BaseStore');

            store.filter('type',this.dictType);
            tempStore.setData(store.getData().clone());
            this.setStore(tempStore);

            return true;
        }
    }
});