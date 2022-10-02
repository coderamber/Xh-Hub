const fs = require("fs");
const momentService = require("../service/moment.service");
const fileService = require("../service/file.service");
const { PICTURE_PATH } = require("../constance/file-path");

class MomentController {
  /** 创建一条动态 */
  async create(ctx, next) {
    // 获取用户 id
    const userId = ctx.user.id;
    const content = ctx.request.body.content;
    const result = await momentService.create(content, userId);
    // 将数据插入数据库中
    ctx.body = result;
  }

  /** 获取动态详情 */
  async detail(ctx, next) {
    const momentId = ctx.params.momentId;
    const result = await momentService.getMomentById(momentId);
    if (result.length === 0) {
      console.log("没找到该记录");
      ctx.body = "没找到该记录";
      return;
    }
    ctx.body = result[0];
  }

  /** 获取动态列表 */
  async list(ctx, next) {
    const { offset, size } = ctx.query;
    const result = await momentService.getMomentList(offset, size);
    ctx.body = result;
  }

  /** 修改某篇文章 */
  async update(ctx, next) {
    const momentId = ctx.params.momentId;
    const { content } = ctx.request.body;
    const result = await momentService.update(content, momentId);
    ctx.body = result;
  }

  /** 删除某篇文章 */
  async deleteMoment(ctx, next) {
    const { momentId } = ctx.params;
    const result = await momentService.deleteMoment(momentId);
    ctx.body = result;
  }

  /** 创建文章标签 */
  async createLabels(ctx, next) {
    const { labels } = ctx;
    const { momentId } = ctx.params;
    for (const label of labels) {
      const isExists = await momentService.checkLabelAndCommentExists(
        momentId,
        label.id
      );
      if (!isExists) {
        await momentService.addLabelAndComment(momentId, label.id);
      }
    }
    ctx.body = "给动态添加标签成功！";
  }

  async fileInfo(ctx, next) {
    try {
      let { filename } = ctx.params;
      const imageInfo = await fileService.getFileByFilename(filename);
      const { type } = ctx.query;
      const types = ["large", "middle", "small"];
      if (types.some((item) => item === type)) {
        filename = filename + "-" + type;
      }
      ctx.response.set("content-type", imageInfo.mimetype);
      ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`);
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new MomentController();
