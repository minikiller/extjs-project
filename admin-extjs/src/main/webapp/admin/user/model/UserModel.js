/**
 * 用户模型
 *
 * @author majian <br/>
 *         date:2015-7-3
 * @version 1.0.0
 */


Ext.define('kalix.admin.user.model.UserModel', {
    extend: 'Ext.data.Model',

    //ext 在创建模型时，会自动生成 id， 而且此行为不能取消
    //未找到相关设置
    //因为 id 应该是由服务端生成的，所以指定 idProperty 为一个无效的键 _id 来解决此问题
    //todo 检测此项设置是会否对关联 store 有影响
    idProperty: '_id',

    fields: [{
        name: 'id',
        type: 'string'
    }, {
        name: 'loginName',
        type: 'string'
    }, {
        name: 'password',
        type: 'string'
    }, {
        name: 'confirmPassword',
        type: 'string'
    }, {
        name: 'name',
        type: 'string'
    }, {
        name: 'email',
        type: 'string'
    }, {
        name: 'phone',
        type: 'string'
    }, {
        name: 'mobile',
        type: 'string'
    }, {
        name: 'loginIp',
        type: 'string'
    }, {
        name: 'is_ent_user',
        type: 'int'
    }, {
        name: 'availableOptions',
        defaultValue: [
            ['1', '启用'],
            ['0', '停用']
        ]
    },
        {
            name: 'available',
            type: 'string',
            defaultValue: '1'
        }, {
            name: 'availableText',
            calculate: function (data) {
                var options = [
                    ['1', '启用'],
                    ['0', '停用']
                ];
                var available = data.available;

                return _.find(options, function (item) {
                    return item[0] === available;
                })[1];
            }
        }, {
            name: 'createBy',
            type: 'string'
        }, {
            name: 'creationDate',
            type: 'int'
        }, {
            name: 'updateBy',
            type: 'string'
        }, {
            name: 'updateDate',
            type: 'int'
        }, {
            name: 'version',
            type: 'int'
        }
    ],

    validators: {
        loginName: [{
            type: 'presence',
            message: '登录名不能为空!'
        }
        ],
        name: [{
            type: 'presence',
            message: '姓名不能为空!'
        }
        ],
        password: [{
            type: 'presence',
            message: '密码不能为空!'
        }
        ],
        confirmPassword: [{
            type: 'presence',
            message: '确认密码不能为空!'
        }
        ],
        email: [{
            type: 'presence',
            message: '邮箱不能为空!'
        }, {
            type: 'email',
            message: '邮箱格式无效!'
        }
        ],
        /*
        phone: [{
            type: 'format',
            matcher: /^(\d{3}-\d{7,8}|\d{4}-\d{7,8}|\s*)$/,
            message: '电话号码格式不正确!'
        }
        ],*/
         mobile: [{
            type: 'presence',
            message: '手机号码不能为空!'
        }, {
            type: 'format',
            matcher: /^1[3,4,5,7,8]\d{9}$/,
            message: '手机号码格式不正确!'
        }
        ]
    },

    //需要提交给服务端的模型 key
    serverKeys: [
        'id',
        'available',
        'email',
        'loginName',
        'mobile',
        'name',
        'password',
        'phone',
        'version'
    ],

    //需要提交给服务端的 JSON 数据
    toServerJSON: function () {
        return Ext.JSON.encode(_.pick(this.getData(), this.serverKeys));
    }
});
