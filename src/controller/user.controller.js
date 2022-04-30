//用户控制器；处理不同业务
const jwt = require('jsonwebtoken')
const { createUser, getUerInfo } =require('../service/user.service')

const { JWT_SECRET } = require('../config/config.default')
class UserController {
    async register(ctx, next){
        // 1.获取数据
        const {email, user_name, password} = ctx.request.body   
        try{
        // 2.操作数据库
        const res = await createUser(email,user_name,password)
        // 3.返回结果
        ctx.status = 200,
        ctx.body = {
            message: '用户注册成功',
            result: {
                id: res.id,
                email: res.email,
                user_name: res.user_name,
            },
        }
        } catch (err){
            //操作数据库失败的情况下
            console.error('用户注册失败错误',err);
            ctx.status = 500,
            ctx.body = {message:'注册失败'}
        }
    };

    async login(ctx, next){
        //登录成功后，给用户颁发一个令牌token
        const {email} = ctx.request.body   

        // 1.获取用户信息(在token的payload中，记录id,email,user_name,is_admin)
        try {
            //剔除res中的password，然后将剩余的内容放入res里
            const {password, ...res} = await getUerInfo({email})
            ctx.status = 200,
            ctx.body = {
                message: '登录成功',
                result: {
                    //token携带的参数 传递的payload，密钥，过期时间
                    token: jwt.sign(res, JWT_SECRET, { expiresIn: '1d' })
                }
            }
        } catch (err) {
            console.error('用户登录失败',err)
        }

    }
}

//导出
module.exports = new UserController()