//使用koa-paramete来做校验中间件
const validator = async (ctx, next) =>{
    try {
        ctx.verifyParams({
            //文章标题
            title: {type:'string',required: true},
            //文章作者
            author: {type: 'string', required: false},
            //文章简介
            description: {type: 'string' ,required: false},
            //文章内容
            content: {type: 'string', required: true},
            //文章封面
            cover_img: {type: 'string', required: true},
        })
    } catch (err) {
        console.error(err)
        ctx.status = 400,
        ctx.body = {message:'传参格式错误',err}
        return
    }

    await next()
}

module.exports = {
    validator,
}