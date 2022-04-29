//数据库操作

const User = require('../model/user.model')

class UserService {
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
    }
}

//导出
module.exports = new UserService()