//用户路由；负责解析URL，分布给控制器对应的方法

const Router = require('koa-router');

const { register,login } = require('../controller/user.controller');

const router = new Router({prefix: '/users'});

/**
 * @route POST /users/register
 * @desc 注册接口
 * @access 公开
 */
router.post('/register',register)

/**
 * @route POST /users/login
 * @desc 登录接口
 * @access 公开
 */
router.post('/login',login)

module.exports = router