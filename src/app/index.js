//业务相关
const Koa = require('koa');
const KoaBody = require('koa-body');

const userRouter = require('../router/user.route');

//实例化
const app = new Koa()

//注册koa-body
app.use(KoaBody())
//注册路由
app.use(userRouter.routes())

module.exports = app