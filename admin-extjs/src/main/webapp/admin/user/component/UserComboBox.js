/**
 * 用户选择下拉comboBox
 *
 * @author majian <br/>
 *         date:2015-6-18
 * @version 1.0.0
 */
Ext.define('kalix.admin.user.component.UserComboBox', {
    extend: 'Ext.form.field.ComboBox',
    requires: [
        'kalix.admin.user.store.UserStore'
    ],
    alias: 'widget.userComboBox',
    allowBlank: false,
    labelAlign: 'right',
    xtype: 'userCombobox',
    queryMode: 'remote',
    valueField: 'name',
    //name: 'salerId',need to change
    displayField: 'name',
    queryParam: 'name',
    minChars: 0,
    forceSelection: true,
    selectOnFocus:true,
    typeAhead:true,
    store: {
        type: 'userStore'
    }
})
