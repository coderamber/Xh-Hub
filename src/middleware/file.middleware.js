const Jimp = require('jimp')
const path = require('path')

const Multer = require('koa-multer')
const { AVATAR_PATH, PICTURE_PATH } = require('../constance/file-path')

const avatarUpload = Multer({
  dest: AVATAR_PATH
})

const avatarHandler = avatarUpload.single('avatar')

const pictureUpload = Multer({
  dest: PICTURE_PATH
})

// 上传数组，一次性最多上传9张
const pictureHandler = pictureUpload.array('picture', 9)

// 图像 resize
const pictureResize = async (ctx, next) => {
  const files = ctx.req.files
  
  for (const file of files) {
    const filePath = path.join(file.destination, file.filename)
    Jimp.read(file.path).then(image => {
      image.resize(1280, Jimp.AUTO).write(`${filePath}-large`)
      image.resize(640, Jimp.AUTO).write(`${filePath}-middle`)
      image.resize(320, Jimp.AUTO).write(`${filePath}-small`)
    })
  }

  await next()
}

module.exports = {
  avatarHandler,
  pictureHandler,
  pictureResize
}