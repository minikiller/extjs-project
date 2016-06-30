/**
 * @author chenyanxu
 */
Ext.define('kalix.demo.recruitApply.viewModel.RecruitApplyViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.recruitApplyViewModel',
    data: {
        rec: null,
        validation: {},  //验证错误信息
        icon: '',
        title: '',
        view_operation: false,
        view_title: '查看申请',
        add_title: '添加申请',
        edit_title: '修改申请'
    }
});