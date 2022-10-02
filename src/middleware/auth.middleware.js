const jwt = require('jsonwebtoken')

const errorTypes = require('../constance/error-types')
const userService = require('../service/user.service')
const authService = require('../service/auth.service')
const md5password = require('../utils/password-handle')
const {
  PUBLIC_KEY
} = require('../app/config')

/** 登陆校验 */
const verifyLogin = async (ctx, next) => {
  // 用户名和密码校验
  const { username, password } = ctx.request.body
  // 判断用户名和密码不能为空
  if (!username || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }
  // 判断用户名是否被注册
  const user = (await userService.getUserByName(username))[0]
  
  if (!user) {
    // 用户不存在
    const error = new Error(errorTypes.USER_DOES_NOT_EXITS)
    return ctx.app.emit('error', error, ctx)
  }

  // 验证密码
  const result = md5password(password)
  if (result !== user.password) {
    // 密码错误
    const error = new Error(errorTypes.PASSWORD_IS_INCORRECT)
    return ctx.app.emit('error', error, ctx)
  }

  ctx.user = user
  await next()
}

/** token 校验 */
const verifyAuth = async (ctx, next) => {
  const authorization = ctx.headers.authorization
  if (!authorization) {
    const error = new Error(errorTypes.UNAUTHORIZATION)
    return ctx.app.emit('error', error, ctx)
  }
  const token = authorization.replace("Bearer ", "")
  let result = null
  try {
    result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"]
    })
    ctx.user = result
    await next()
  } catch (err) {
    const error = new Error(errorTypes.UNAUTHORIZATION)
    ctx.app.emit('error', error, ctx)
  }
}

/** 权限校验 */
const verifyPermission = (tableName) => {
  return async (ctx, next) => {
    const [key] = Object.keys(ctx.params)
    const tableId = ctx.params[key]
    const { id } = ctx.user
    try {
      const isPermission = await authService.checkPermission(tableName, tableId, id)
      if (!isPermission) throw new Error()
      await next()
    } catch (err) {
      const error = new Error(errorTypes.UNPERMISSION)
      return ctx.app.emit('error', error, ctx)
    }
  }
}
module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission
}