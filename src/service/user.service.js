//数据库操作

const User = require('../model/user.model')

class UserService {
    //创建
    async createUser(email, user_name, password) {
        //插入数据
        //await表达式: promise对象 /promise会返回一个成功或失败的值，失败会抛出异常
        const res = await User.create({
            //表的字段:传递的数据
            //在es6中属性名和属性名相同可简写为一个
            email,
            user_name,
            password
        })
        return res.dataValues
    };

    //查询封装
    async getUerInfo({id, email, user_name, password, is_admin}){
        const whereOpt = {}

        //当这个id存在就将id存入whereOpt ,如果不存在则不执行
        id && Object.assign(whereOpt, { id })
        email && Object.assign(whereOpt, { email })
        user_name && Object.assign(whereOpt, { user_name })
        password && Object.assign(whereOpt, { password })
        is_admin && Object.assign(whereOpt, { is_admin })

        const res = await User.findOne({
            attributes: ['id','email','user_name','password','is_admin'],//查询的列
            where: whereOpt //查询条件
        })
        //如果找到查询结果返回res.dataValues 否则返回null
        return res ? res.dataValues : null
    }

    //根据id对数据库操作的方法
    async updateById({id,email,user_name,password,is_admin}){
        const whereOpt = {id}
        const newUser = {}

        email && Object.assign(newUser,{ email })
        user_name && Object.assign(newUser,{ user_name })
        password && Object.assign(newUser,{ password })
        is_admin && Object.assign(newUser,{ is_admin })

        //修改方法，要修改的字段，查询条件
        const res = await User.update(newUser,{where: whereOpt})

        //res执行后会返回0或1  大于0为true否则false
        //return !!res[0]      return res[0]>0
        return res[0] > 0 ? true:false
    }
}

//导出
module.exports = new UserService()