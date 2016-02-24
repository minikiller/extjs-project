/**model of contract
 *  @author chenyanxu
 *
 */
Ext.define('kalix.demo.carApply.model.CarApplyModel', {
    extend: 'kalix.model.WorkflowBaseModel',
    fields: [
        {name: 'department'},//申请部门
        {name: 'reason'},//用车事由
        {name: 'usageCount'}, //乘车人数
        {name: 'beginDate', type: 'date', dateFormat: 'Y-m-d H:i:s'}, //用车时段,开始时间
        {name: 'endDate', type: 'date', dateFormat: 'Y-m-d H:i:s'}, //用车时段，结束时间
        {name: 'address'}, //用车起始地点
        {name: 'city'},//是否市内用车
        {name: 'operator'},//申请人
        {name: 'operatorPhone'},//申请人联系电话
    ]
});
