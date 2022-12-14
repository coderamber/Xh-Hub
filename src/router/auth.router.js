const Router = require("koa-router");
const authRouter = new Router();
const { verifyLogin, verifyAuth } = require("../middleware/auth.middleware");
const { login, success } = require("../controller/auth.controller");

/** 登陆 */
authRouter.post("/login", verifyLogin, login);
/** 测试 token */
authRouter.get("/test", verifyAuth, success);
module.exports = authRouter;
