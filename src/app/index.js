//业务相关
const Koa = require('koa');

const userRouter = require('../router/user.route');

//实例化
const app = new Koa()

//注册路由
app.use(userRouter.routes())

module.exports = app