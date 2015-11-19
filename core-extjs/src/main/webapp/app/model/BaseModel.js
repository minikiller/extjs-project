/**model of contract
 *  @author chenyanxu
 *
 */
Ext.define("kalix.model.BaseModel", {
    extend: "Ext.data.Model",
    constructor: function () {
        this.callParent(arguments);

        if (arguments.length == 0) {
            this.set('id', 0);
            this.modified={};
            this.dirty=false;
        }
    },
    fields: [{
        name: 'id'
    }, {
        name: 'createBy',
        type: 'string'
    }, {
        name: 'creationDate',
        type: 'int'
    },{
        name: 'updateBy',
        type: 'string'
    }, {
        name: 'updateDate',
        type: 'int'
    }, {
        name: 'version',
        type: 'int'
    }]
});
