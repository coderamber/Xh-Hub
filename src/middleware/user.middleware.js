const errorTypes = require('../constance/error-types')
const userService = require('../service/user.service')

const md5password = require('../utils/password-handle')

// 验证用户名和密码
const verifyUser = async (ctx, next) => {
  // 获取用户名和密码
  const { username, password } = ctx.request.body
  // 判断用户名和密码不能为空
  if (!username || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }
  // 判断用户名是否被注册
  const result = await userService.getUserByName(username)
  if (result.length) {
    // 用户已存在
    const error = new Error(errorTypes.USER_ALREADY_EXITS)
    return ctx.app.emit('error', error, ctx)
  }
  await next()
}

// 对用户密码进行加密
const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body
  ctx.request.body.password = md5password(password)
  await next() 
}

module.exports = {
  verifyUser,
  handlePassword
}