const Router = require("koa-router");

const momentRouter = new Router({ prefix: "/moment" });

const {
  create,
  detail,
  list,
  update,
  deleteMoment,
  createLabels,
  fileInfo
} = require("../controller/moment.controller");
const {
  verifyAuth,
  verifyPermission,
} = require("../middleware/auth.middleware");
const { verifyLableExists } = require("../middleware/label.middleware");

/** 创建文章 */
momentRouter.post("/", verifyAuth, create);

/** 获取单条文章 */
momentRouter.get("/:momentId", detail);

/** 获取文章列表 */
momentRouter.get("/", list);

/** 修改文章 */
momentRouter.patch(
  "/:momentId",
  verifyAuth,
  verifyPermission("moment"),
  update
);

/** 删除文章 */
momentRouter.delete(
  "/:momentId",
  verifyAuth,
  verifyPermission("moment"),
  deleteMoment
);

/** 给文章添加标签 */
momentRouter.post(
  "/:momentId/labels",
  verifyAuth,
  verifyPermission("moment"),
  verifyLableExists,
  createLabels
);

/** 获取动态图片 */
momentRouter.get('/images/:filename', fileInfo)

module.exports = momentRouter;
