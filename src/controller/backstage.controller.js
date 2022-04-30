class ArticleController {
    async upload(ctx, next){
        ctx.body = {msg: '图片上传成功'}
    }
}

module.exports = new ArticleController()