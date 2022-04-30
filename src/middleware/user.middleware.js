//用户信息验证中间件
const bcrypt = require('bcryptjs')//第三方加密模块

const { getUerInfo } =require('../service/user.service')

const uservalidator = async (ctx, next) => {
    const {email,user_name,password} = ctx.request.body
    //验证数据合法性
    if(!email || !user_name || !password){
        console.error('注册信息存在空值错误',ctx.request.body)
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
    const { email,user_name } = ctx.request.body
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
        const res2 = await getUerInfo({user_name})
        //如果res不为空
        if(res){
            console.error('邮箱出现重复注册错误',{email})
            ctx.status = 409,
            ctx.body = {
                message: '该邮箱已被注册',
                return: '',
            }
            return
        }
        if(res2){
            console.error('用户名出现重复注册错误',{user_name})
            ctx.status = 409,
            ctx.body = {
                message: '该昵称已被注册',
                return: '',
            }
            return
        }
    } catch (err) {
         console.error('获取用户信息错误',err);
         ctx.status = 500,
         ctx.body = {message:'用户信息验证失败'}
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

//登录验证
const verifyLogin = async (ctx, next) => {
    const {email,password} = ctx.request.body
    //监测是否为空
    if(!email || !password){
        console.error('登录信息存在空值错误',ctx.request.body)
        ctx.status = 400,
        ctx.body = {
            message: '登录信息不能为空',
            result: '',
        }
        return
    }
    // 1.根据邮箱去查数据库，判断账号是否存在 (不存在->报错)
    const res = await getUerInfo({email})
    try {
        if(!res){
            console.error('用户登录邮箱不存在错误',{email});
            ctx.status = 404,
            ctx.body = {
                message: '邮箱未注册',
                return: '',
            }
            return
        }
    } catch (err) {
        console.error(err);
        ctx.status = 500,
        ctx.body = {
            message: '登录失败',
            return: '',
        }
        return
    }
    
    // 2.进行密码比对，将传过来的密码和数据库密码匹配
    if (!bcrypt.compareSync(password,res.password)){
        console.error('用户登录密码错误',res.user_name,{password});
        ctx.status = 401,
        ctx.body = {
            message: '密码错误',
            return: '',
        }
        return
    }

    await next()
}

module.exports = {
    uservalidator,
    verifyUser,
    cryptPassword,
    verifyLogin
}