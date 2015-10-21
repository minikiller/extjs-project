/**
 * 应用模型
 *
 * @author majian <br/>
 *         date:2015-7-3
 * @version 1.0.0
 */
Ext.define('Kalix.app.application.model.ApplicationModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'remark', type: 'string'},
        {name: 'code', type: 'string'},
        {name: 'location', type: 'string'},
        {name: 'createBy', type: 'string'},
        {name: 'creationDate', type: 'int'},
        {name: 'updateBy', type: 'string'},
        {name: 'updateDate', type: 'int'}
    ]
});