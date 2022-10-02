const fileService = require('../service/file.service')
const userService = require('../service/user.service')
const { APP_HOST, APP_PORT } = require('../app/config')

class FileController {
  async saveAvatarInfo(ctx, next) {
    // 获取图像相关信息
    const { mimetype, filename, size } = ctx.req.file
    const { id } = ctx.user

    // 将图像信息保存在数据库中
    await fileService.createAvatar(filename, mimetype, size, id)

    // 将图像的 url 保存到 users 表中
    const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`
    await userService.uploadAvatarUrlByUserId(avatarUrl, id)
    ctx.body = '头像上传成功'
  }

  async savePictureInfo(ctx, next) {
    const files = ctx.req.files
    const { id } = ctx.user
    const { momentId } = ctx.query
    for (const file of files) {
      const { mimetype, filename, size } = file
      await fileService.createFile(filename, mimetype, size, id, momentId)
    }
    ctx.body = '动态配图上传成功'
  }
}

module.exports = new FileController()