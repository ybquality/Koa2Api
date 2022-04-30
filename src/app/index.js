//##业务相关
const path = require('path')

const Koa = require('koa');
const KoaBody = require('koa-body');
const KoaStatic = require('koa-static');//静态资源管理

//引入路由 ..详见router/index.js
const router = require('../router')

//实例化
const app = new Koa()

//注册koa-body
app.use(KoaBody({
    //开启koabody的文件上传配置项
    multipart: true,
    formidable: {
        //在配置选项option中，不推荐使用相对路径，
        //在option中的相对路径，不是相对当前项目文件，是相对process.cwd()这个进程
        //使用path绝对路径_dirnae代表当前文件
        uploadDir: path.join(__dirname,'../upload'),//将文件保持在哪
        keepExtensions: true,//是否保存文件扩展名
    },
}))
app.use(KoaStatic(path.join(__dirname,'../upload')))
//注册路由 ..通过router/index.js实现路由自动注册
app.use(router.routes()).use(router.allowedMethods())
//.use(router.allowedMethods())
//如果是不支持的http请求，报错501

module.exports = app