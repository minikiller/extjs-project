/**
 * @author chenyanxu
 */
Ext.define('kalix.view.components.common.DictFormCombobox',{
    extends:'Ext.form.field.ComboBox',
    //requires:[
    //    'kalix.admin.dict.store.DictNoPageStore'
    //],
    xtype: "dictFormCombobox",
    editable: false,
    queryMode: 'local',
    valueField: 'value',
    displayField: 'label'

    //,
    //listeners:{
    //    beforerender:function(){
    //        var store=kalix.getApplication().getStore('dictNoPageStore');
    //        var tempStore=Ext.create('Ext.data.Store');
    //
    //        tempStore.setData(store.getData());
    //        tempStore.filter('type',dictType);
    //        this.setStore(tempStore);
    //
    //        return true;
    //    }
    //}
});