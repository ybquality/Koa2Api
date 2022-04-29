//用户控制器；处理不同业务

class UserController {
    async register(ctx, next){
        ctx.body = '用户注册成功'
    }

    async login(ctx, next){
        ctx.body = '登录成功'
    }
}

//导出
module.exports = new UserController()