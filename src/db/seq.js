//连接数据库
const { Sequelize } = require('sequelize')
const {MYSQL_HOST, MYSQL_PORT,MYSQL_USER,MYSQL_PWD,MYSQL_DB} = require('../config/config.default')

//传参为数据库名称,用户名，密码,地址
const seq = new Sequelize(MYSQL_DB,MYSQL_USER,MYSQL_PWD,{
    host: MYSQL_HOST,
    dialect: 'mysql',
    //freezeTableName: true 参数停止 Sequelize 执行自动复数化. 这样,Sequelize 将推断表名称等于模型名称
    //全局定义此行为
    define: {
        freezeTableName: true
      }
})

// seq.authenticate()
// .then(() => {
//     console.log('MySQL connected ...');
// }).catch(err => {
//     console.log(err);
// })

module.exports = seq