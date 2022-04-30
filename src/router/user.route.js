//用户路由；负责解析URL，分布给控制器对应的方法

const Router = require('koa-router');

const { uservalidator,verifyUser,verifyUserName,cryptPassword,verifyLogin } = require('../middleware/user.middleware');//定义的中间件
const { auth } = require('../middleware/auth.middleware');//用户认证中间件
const { register, login, changePassword,changeUsername } = require('../controller/user.controller');

const router = new Router({prefix: '/users'});

/**
 * @route POST /users/register
 * @desc 注册接口
 * @access 公开
 */
//用户访问该接口，先交由中间件验证，验证通过后在进入控制器
router.post('/register', uservalidator, verifyUser,verifyUserName, cryptPassword, register)

/**
 * @route POST /users/login
 * @desc 登录接口
 * @access 公开
 */
router.post('/login',verifyLogin, login)

/**
 * @route PATCH /users/changePassword
 * @desc 修改密码接口
 * @access 私有
 */
 router.patch('/changePassword', auth, cryptPassword, changePassword)

 /**
 * @route PATCH /users/changeUsername
 * @desc 修改用户名接口
 * @access 私有
 */
  router.patch('/changeUsername', auth,verifyUserName, changeUsername)

module.exports = router