//##路由管理，实现新增的接口自动加载

const fs = require('fs')

const Router = require('koa-router')
const router = new Router()

fs.readdirSync(__dirname).forEach(file => {
    // console.log(file);
    //做一个判断，只要不是index.js的文件
    if ( file !== 'index.js' ){
        let r = require('./' + file)
        router.use(r.routes())
    }
})

module.exports = router