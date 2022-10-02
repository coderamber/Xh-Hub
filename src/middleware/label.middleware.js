const labelService = require('../service/label.service')

const verifyLableExists = async (ctx, next) => {
  const { labels } = ctx.request.body

  const labelsList = []
  // 获取标签数组中的名字
  for (const name of labels) {
    const labelReslut = await labelService.getLabel(name)
    const label = { name }
    if (!labelReslut) {
      const reslut = await labelService.create(name)
      label.id = reslut.insertId
    } else {
      label.id = labelReslut.id
    }
    labelsList.push(label)
  }

  // 将 labels 暂存，后续使用
  ctx.labels = labelsList
  await next()
}

module.exports = {
  verifyLableExists
}