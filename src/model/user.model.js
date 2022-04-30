//模型
const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

//定义模型
//模型为INUS_user -> 对应到数据库为INUS_users表 /已通过设置freezeTableName停止复数化
const User = seq.define('INUS_user',{
    //sequelize会为我们自动创建id并管理
    email:{
        type: DataTypes.STRING,//字段类型
        allowNull: false,//是否允许为空
        unique: true,//是否保持唯一性
        comment: '用户邮箱，不允许为空，保持唯一性'
    },
    user_name: {
        type: DataTypes.STRING,//字段类型
        allowNull: false,//是否允许为空
        unique: true,//是否保持唯一性
        comment: '用户昵称，不允许为空，保持唯一性'
    },
    password: {
        type: DataTypes.CHAR(64),
        allowNull: false,
        comment: '用户密码，不允许为空'
    },
    avatar: {
        type: DataTypes.STRING,//字段类型
        allowNull: true,//是否允许为空
        unique: false,//是否保持唯一性
        comment: '用户头像'
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0, //默认值
        comment: '是否为管理员，不允许为空，0为false 1为true'
    }
});

//同步数据库
//force设置为true如果数据库中存在这种表则会强制删除使用我们模型创建的表
// User.sync({ force:true })

module.exports = User