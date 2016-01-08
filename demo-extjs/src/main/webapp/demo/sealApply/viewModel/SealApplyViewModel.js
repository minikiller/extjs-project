/**
 * @author chenyanxu
 */
Ext.define('kalix.demo.sealApply.viewModel.SealApplyViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.sealApplyViewModel',
    data: {
        rec: null,
        validation: {},  //验证错误信息
        icon: '',
        title: '',
        view_operation: false,
        view_title: '查看申请',
        add_title: '添加申请',
        edit_title: '修改申请',
        add_image_path: CONFIG.restRoot + '/demo/resources/images/seal_apply_add.png',
        view_image_path: CONFIG.restRoot + '/demo/resources/images/seal_apply_view.png',
        delete_image_path: CONFIG.restRoot + '/demo/resources/images/seal_apply_delete.png',
        edit_image_path: CONFIG.restRoot + '/demo/resources/images/seal_apply_edit.png'
    }
});