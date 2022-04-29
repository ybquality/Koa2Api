//用户控制器；处理不同业务

const { createUser } =require('../service/user.service')
class UserController {
    async register(ctx, next){
        // 1.获取数据
        const {email, user_name, password} = ctx.request.body
        // 2.操作数据库
        const res = await createUser(email,user_name,password)
        // 3.返回结果
        ctx.body = {
            code: 200,
            message: '用户注册成功',
            result: {
                id: res.id,
                email: res.email,
                user_name: res.user_name,
            },
        }
    }

    async login(ctx, next){
        ctx.body = '登录成功'
    }
}

//导出
module.exports = new UserController()