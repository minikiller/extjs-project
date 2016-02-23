/**
 * 自定义formPanel，项目中的form必须扩展该类
 *         date:2015-10-16
 * @version 1.0.0
 */
Ext.define('kalix.view.components.common.TableFormPanel', {
    extend: 'Ext.form.Panel',
    xtype: "baseTableForm",
    bodyStyle: 'border-color:black;border-width:1px 1px 0px 1px',
    defaults: {
        height: 60,
        bodyStyle: 'padding:20px;font-size:18;text-align:center;border-color:black;border-width:0px 1px 1px 0px',
        layout: 'fit'
    },
    listeners: {
        afterrender: function () {
            for (var itemIndex = 0; itemIndex < this.items.getCount(); ++itemIndex) {
                var tmpItem = this.items.getAt(itemIndex);

                if (tmpItem.colspan) {
                    tmpItem.setWidth(this.width * tmpItem.colspan / this.layout.columns);
                }
                else {
                    tmpItem.setWidth(this.width / this.layout.columns);
                }

                if (tmpItem.config.html && tmpItem.config.html.indexOf('<br') > 0) {
                    tmpItem.setBodyStyle('padding:10px;font-size:18;text-align:center;border-color:black;border-width:0px 1px 1px 0px');
                }
            }
        }
    }
});
