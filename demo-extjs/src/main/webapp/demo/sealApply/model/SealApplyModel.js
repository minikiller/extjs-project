/**model of contract
 *  @author chenyanxu
 *
 */
Ext.define('kalix.demo.sealApply.model.SealApplyModel', {
    extend: 'kalix.model.BaseModel',
    fields: [
        {name: 'department'},
        {name: 'usageCount'},
        {name: 'sealType'},
        {name: 'operator'},
        {name: 'applyDate', type: 'date', dateFormat: 'Y-m-d H:i:s'},
        {name: 'remark'}
    ]
});
