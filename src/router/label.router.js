const Router = require('koa-router')
const { create, list } = require('../controller/label.controller')
const { verifyAuth } = require('../middleware/auth.middleware')

const labelRouter = new Router({prefix: '/label'})

labelRouter.post('/', verifyAuth, create)
// 展示标签
labelRouter.get('/', list)

module.exports = labelRouter