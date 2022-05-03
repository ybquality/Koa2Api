const Router = require('koa-router')


const { auth,hadAdminPermission } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/article.middleware')

const { upload, create, update, remove, restore } = require('../controller/article.controller')

const router = new Router({prefix:'/article'})

//图片上传
router.post('/upload',auth, hadAdminPermission, upload);

//发布xx接口
router.post('/',auth, hadAdminPermission, validator, create)

//修改文章接口
router.put('/:id',auth, hadAdminPermission, validator, update)

//真删除文章接口
// router.delete('/delete/:id',auth, hadAdminPermission,remove)

//删除文章接口
router.post('/:id/off',auth, hadAdminPermission, remove)
//重新上架文章
router.post('/:id/on',auth, hadAdminPermission, restore)

//导出backstage路由
module.exports = router