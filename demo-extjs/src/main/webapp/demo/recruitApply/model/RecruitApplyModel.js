/**model of contract
 *  @author chenyanxu
 *
 */
Ext.define('kalix.demo.recruitApply.model.RecruitApplyModel', {
    extend: 'kalix.model.WorkflowBaseModel',
    fields: [
        {name: 'personType'},//人员类型
        {name: 'department'},//申请部门
        {name: 'reason'},//需求原因
        {name: 'positionName'}, //职位名称
        {name: 'recruitCount', type: 'int'}, //拟聘人数
        {name: 'allocationCout', type: 'int'}, //定编人数
        {name: 'existCount', type: 'int'}, //现有人数
        {name: 'leaderName'}, //直接上级
        {name: 'treatmentLevel'}, //待遇标准
        {name: 'coreRecruit'}, //核心职责
        {name: 'commonRecruit'}, //常规职责
        {name: 'baseCondition'}, //任职基本素质条件
        {name: 'recruitType'}, //建议招聘方式
        {name: 'depUser'}, //申请部门负责人签字
        {name: 'manpower'} //人力资源部长签字
    ]
});