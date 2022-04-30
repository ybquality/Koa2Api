//用户认证中间件
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/config.default')

const auth = async (ctx, next) => {
    //解构token
    const {authorization } = ctx.request.header
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

module.exports = {
    auth,
}