//用户路由；负责解析URL，分布给控制器对应的方法

const Router = require('koa-router');

const { uservalidator,verifyUser } = require('../middleware/user.middleware');//定义的中间件
const { register,login } = require('../controller/user.controller');

const router = new Router({prefix: '/users'});

/**
 * @route POST /users/register
 * @desc 注册接口
 * @access 公开
 */
//用户访问该接口，先交由中间件验证，验证通过后在进入控制器
router.post('/register',uservalidator,verifyUser,register)

/**
 * @route POST /users/login
 * @desc 登录接口
 * @access 公开
 */
router.post('/login',login)

module.exports = router