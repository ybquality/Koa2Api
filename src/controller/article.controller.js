const path = require('path')
const fs = require('fs')
const { createArticle, updateArticle, removeArticle, restoreArticle } = require('../service/article.service')

class ArticleController {
    async upload(ctx, next){
        const {file} = ctx.request.files || [];
        // const reader = fs.createReadStream(file.path)
        // console.log('图片上传成功',file);
        const fileTypes = ['image/jpeg','image/png']
        if(file){
            //文件格式的判断
            if(!fileTypes.includes(file.mimetype)){
                ctx.body ={msg:'该文件格式暂不支持'}
                return
            }
            ctx.body = {
                message: '图片上传成功',
                result: {
                    cover_img: path.basename(file.filepath),
                },
            }
        }else{
            console.error('文件上传出错',file)
            ctx.body ={msg:'上传失败'}
            return
        }
    }

    //创建文章
    async create(ctx, next){
        //直接调用service的createArticle方法
        try {
            const res = await createArticle(ctx.request.body)
            ctx.body = {
                message: '发布成功',
                result: res,
            }
        } catch (err) {
            console.error("文章上传失败错误",err)
            ctx.body = {message:'发布失败'}
            return
        }
    }

    //修改文章
    async update(ctx, next){
        try {
            const res = await updateArticle(ctx.params.id, ctx.request.body)

            //如果从updateserver中拿过来的res是true
            if(res){
                ctx.body = {
                    message:'修改成功',
                    result: ctx.request.body
                }
            }else{
                ctx.body = {message:'未查询到该条记录'}
                return
            }
        } catch (err) {
            console.error(err)
            ctx.body = {message:'修改失败'}
            return
        }
    }

    //删除文章
    async remove(ctx){
        const res = await removeArticle(ctx.params.id)
        
        if(res){
            ctx.body = {message:'删除成功'}
        }else{
            ctx.body = {message:'无效的文章ID'}
        }
    }

    //重新上架文章
    async restore(ctx){
        const res = await restoreArticle(ctx.params.id)
        if(res){
            ctx.body = {message:'上架成功'}
        }else{
            ctx.body = {message:'无效的文章ID'}
        }
    }
}

module.exports = new ArticleController()