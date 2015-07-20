/**
 * 主题组件
 *
 * @author majian <br/>
 *         date:2015-7-9
 * @version 1.0.0
 */
Ext.define('Kalix.view.components.core.Theme', {
    extend: 'Ext.form.field.ComboBox',
    xtype: 'themeComponent',
    displayField: 'name',
    valueField: 'value',
    queryMode: 'local',
    store: Ext.create('Ext.data.Store', {
        fields: ['value', 'name'],
        data: [
            {value: 'neptune', name: 'Neptune主题'},
            {value: 'neptune-touch', name: 'Neptune Touch主题'},
            {value: 'crisp', name: 'Crisp主题'},
            {value: 'crisp-touch', name: 'Crisp Touch主题'},
            {value: 'classic', name: 'Classic主题'},
            {value: 'aria', name: 'Aria主题'},
            {value: 'gray', name: 'Gray主题'}
        ]
    }),
    listeners: {
        select: function (combo) {
            var theme = combo.getValue();
            var href = '/core-web/ext-5.1.0/packages/ext-theme-' + theme + '/build/resources/ext-theme-' + theme + '-all.css';
            var link = Ext.fly('theme');

            if (!link) {
                link = Ext.getHead().appendChild({
                    tag: 'link',
                    id: 'theme',
                    rel: 'stylesheet',
                    href: ''
                });
            }
            ;
            link.set({href: Ext.String.format(href, theme)});
        }
    }
});