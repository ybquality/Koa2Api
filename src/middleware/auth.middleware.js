//用户认证中间件
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/config.default')

//认证  登录  私有接口统一通过auth认证后才能下一步
const auth = async (ctx, next) => {
    //解构token
    const {authorization = '' } = ctx.request.header
    //去除Bearer 
    const token = authorization.replace('Bearer ','')

    try {
        //返回token信息user中包含了payload的信息
        const user = jwt.verify(token, JWT_SECRET)
        ctx.state.user = user
    } catch (err) {
        switch(err.name){
            case 'TokenExpiredError':
                console.error('token已过期', err)
                ctx.state = 403,
                ctx.body = {message:'token失效'}
                return
            case 'JsonWebTokenError':
                console.error('无效的token',err)
                ctx.state = 403,
                ctx.body = {message:'token不合法'}
                return
        }
    }


    await next()
}

//判断用户是否为管理员
const hadAdminPermission = async(ctx, next) => {
    const { is_admin } = ctx.state.user

    if(!is_admin){
        console.error('非管理员用户操作',ctx.state.user)
        ctx.state = 400,
        ctx.body = {message:'权限不足'}
        return
    }

    await next()
}

module.exports = {
    auth,
    hadAdminPermission,
}