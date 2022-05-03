const Article = require('../model/article.model')

class ArticleService {
    async createArticle(article) {
       const res = await Article.create(article)
       return res.dataValues
    }

    //修改
    async updateArticle(id, article){
        const res = await Article.update(article, { where: {id}})

        //如果数据更新返回true
        return res[0] > 0 ?true:false
    }

    //删除
    async removeArticle(id){
        const res = await Article.destroy({ where: { id } })

        return res > 0 ? true : false
    }

    //重新上架
    async restoreArticle(id){
        const res = await Article.restore({ where: { id } })

        return res > 0 ? true : false
    }
}

module.exports = new ArticleService()