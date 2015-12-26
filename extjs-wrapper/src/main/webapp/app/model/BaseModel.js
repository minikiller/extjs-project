/**
 *  base model of all business model
 *  @author chenyanxu
 *
 */
Ext.define('kalix.model.BaseModel', {
    extend: 'Ext.data.Model',
    constructor: function () {
        this.callParent(arguments);

        if (arguments.length == 0) {
            this.set('id', 0);
            this.modified = {};
            this.dirty = false;
        }
    },
    fields: [
        {
            name: 'id'
        },
        {
            name: 'version'
        },
        {
            name: 'createBy'
        },
        {
            name: 'creationDate'
        },
        {
            name: 'updateBy'
        },
        {
            name: 'updateDate'
        }
    ]
});
