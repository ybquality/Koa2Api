//用户信息验证中间件
const bcrypt = require('bcryptjs')//第三方加密模块

const { getUerInfo } =require('../service/user.service')

const uservalidator = async (ctx, next) => {
    const {email,user_name,password} = ctx.request.body
    //验证数据合法性
    if(!email || !user_name || !password){
        console.error('注册信息存在空值',ctx.request.body)
        ctx.status = 400,
        ctx.body = {
            message: '注册信息不能为空',
            result: '',
        }
        return
    }
    await next()
}

const verifyUser = async (ctx, next) => {
    const { email } = ctx.request.body
    //验证数据合理性
    // if(await getUerInfo({ email })){
    //     console.error('出现邮箱重复注册',ctx.request.body)
    //     ctx.status = 409,
    //     ctx.body = {
    //         message: '该邮箱已被注册',
    //         return: '',
    //     }
    //     return
    // }
    try {
        const res = await getUerInfo({email})
        //如果res不为空
        if(res){
            console.error('出现邮箱重复注册',{email})
            ctx.status = 409,
            ctx.body = {
                message: '该邮箱已被注册',
                return: '',
            }
            return
        }
    } catch (err) {
         console.error('获取用户信息错误',err);
         ctx.status = 500,
         ctx.body = {message:'邮箱验证失败'}
         return
    }
    await next()
}

//使用bcrypt封装的密码加密中间件
const cryptPassword = async (ctx, next) => {
    const {password} = ctx.request.body

    const salt = bcrypt.genSaltSync(10);
    // hash保存的经过加密的密码
    const hash = bcrypt.hashSync(password, salt);

    ctx.request.body.password = hash
    await next()
}


module.exports = {
    uservalidator,
    verifyUser,
    cryptPassword,
}