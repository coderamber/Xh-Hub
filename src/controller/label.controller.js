const labelService = require('../service/label.service')

class LabelController {
  async create(ctx, next) {
    const { name } = ctx.request.body
    const reslut = await labelService.create(name)
    ctx.body = reslut
  }

  async list(ctx, next) {
    const { offset, limit } = ctx.query
    const result = await labelService.getLabels(offset, limit)
    ctx.body = result
  }
}

module.exports = new LabelController()