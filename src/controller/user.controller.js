//用户控制器；处理不同业务
const jwt = require('jsonwebtoken')
const { createUser, getUerInfo, updateById } =require('../service/user.service')

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
                    success: true,
                    //token携带的参数 传递的payload，密钥，过期时间
                    token: jwt.sign(res, JWT_SECRET, { expiresIn: '1d' })
                }
            }
        } catch (err) {
            console.error('用户登录失败',err)
        }

    }

    //用户信息接口
    async current(ctx, next){
        ctx.body = {
            id: ctx.state.user.id,
            email: ctx.state.user.email,
            user_name: ctx.state.user.user_name,
            is_admin: ctx.state.user.is_admin,
            avatar: ctx.state.user.avatar
        }
    }

    async changePassword(ctx, next){
        // 1.获取数据
        const id = ctx.state.user.id
        const password = ctx.request.body.password
        // console.log(id,password);
        // 2.操作数据库
        //这里就是根据updateById方法给我们返回的结果来判断
        //如果是true
        if (await updateById({id,password})){
            ctx.status = 200,
            ctx.body = {message:'修改密码成功'}
        }else{
            ctx.body = {message:'修改密码失败'}
        }
        // 3.返回结果
    }

    async changeUsername(ctx, next){
        const id = ctx.state.user.id
        const user_name = ctx.request.body.user_name
        if (await updateById({id,user_name})){
            ctx.status = 200,
            ctx.body = {message:'修改用户名成功'}
        }else{
            ctx.body = {message:'修改用户名失败'}
        }
    }

    //头像上传
    async updateAvatar(ctx, next){
        ctx.body = {message:'头像上传成功'}
    }
}

//导出
module.exports = new UserController()