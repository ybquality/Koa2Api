const Router = require('koa-router')

const { upload } = require('../controller/backstage.controller')

const router = new Router({prefix:'/backstage'})

router.post('/upload',upload);


//导出backstage路由
module.exports = router