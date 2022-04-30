const path = require('path')

class ArticleController {
    async upload(ctx, next){
        //  console.log(ctx.request.files.file);
        const {file} = ctx.request.files || [];
        // console.log('图片上传成功',file);
        if(file){
            ctx.body = {
                message: '图片上传成功',
                result: {
                    img: path.basename(file.filepath),
                },
            }
        }else{
            console.error('文件上传出错',file)
            ctx.body ={msg:'上传失败'}
            return
        }
    }
}

module.exports = new ArticleController()