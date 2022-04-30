const Router = require('koa-router')


const { auth,hadAdminPermission } = require('../middleware/auth.middleware')

const { upload } = require('../controller/universal.controller')

const router = new Router({prefix:'/universal'})

//图片上传
router.post('/upload',auth, hadAdminPermission, upload);


//导出backstage路由
module.exports = router