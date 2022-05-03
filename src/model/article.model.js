const {DataTypes} = require('sequelize')
const seq = require('../db/seq')

const Article = seq.define('inus_article',{
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        comment:'文章标题'
    },
    author: {
        type: DataTypes.STRING,
        allowNull: true,
        comment:'发布人员'
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
        comment:'文章简介'
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
        comment:'文章内容'
    },
    cover_img: {
        type: DataTypes.STRING,
        allowNull: false,
        comment:'文章封面'
    },
    status: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 1,
        comment: '文章展示状态：0-隐藏,1-正常'
    },
    sort_order: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: true,
        defaultValue: 1,
        comment: "排序编号",
    },
},{
    //实现软删除
    //详见sequelize文档偏执表
    paranoid: true
})

// Article.sync({force:true})

module.exports = Article