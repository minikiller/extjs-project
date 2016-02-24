/**model of contract
 *  @author chenyanxu
 *
 */
Ext.define('kalix.demo.sealApply.model.SealApplyModel', {
    extend: 'kalix.model.BaseModel',
    fields: [
        {name: 'department'},
        {name: 'usageCount'},
        {name: 'sealType', defaultValue: '0', type: 'string'},
        {name: 'operator'},
        {name: 'departmentHead'},
        {name: 'filialeHead'},
        {name: 'counsel'},
        {name: 'generalManager'},
        {name: 'sealAdministrator'},
        {name: 'remark'},
        {name: 'status'},
        {name: 'currentNode'}
    ]
});
