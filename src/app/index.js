//##业务相关
const Koa = require('koa');
const KoaBody = require('koa-body');

//引入路由 ..详见router/index.js
const router = require('../router')

//实例化
const app = new Koa()

//注册koa-body
app.use(KoaBody())
//注册路由 ..通过router/index.js实现路由自动注册
app.use(router.routes())

module.exports = app