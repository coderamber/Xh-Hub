const fs = require('fs')

const userService = require('../service/user.service')
const fileService = require('../service/file.service')
const { AVATAR_PATH } = require('../constance/file-path')


class UserController {
  async create(ctx, next) {
    // 获取用户信息
    const user = ctx.request.body
    // 存储到数据库
    const result = await userService.create(user)
    // 返回数据
    ctx.body = result
  }

  async avatarInfo(ctx, next) {
    const { userId } = ctx.params
    const avatarInfo = await fileService.getAvatarByUserId(userId)

    // 设置图像响应体
    ctx.response.set('content-type', avatarInfo.mimetype)
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`)
  }
}

module.exports = new UserController