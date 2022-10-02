const errorTypes = require("../constance/error-types");
const errorHandler = (error, ctx) => {
  let status, message;
  switch (error.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400; // bad request
      message = "用户名和密码不能为空！";
      break;
    case errorTypes.USER_ALREADY_EXITS:
      status = 409; // conflict
      message = "用户已存在！";
      break;
    case errorTypes.USER_DOES_NOT_EXITS:
      status = 400;
      message = "用户不存在！";
      break;
    case errorTypes.PASSWORD_IS_INCORRECT:
      status = 400;
      message = "密码错误！";
      break;
    case errorTypes.UNAUTHORIZATION:
      status = 401;
      message = "无效的Token！";
      break;
    case errorTypes.UNPERMISSION:
      status = 403;
      message = "无相关处理权限！";
      break;
    default:
      status = 404;
      message = "未知错误！";
  }
  ctx.status = status;
  ctx.body = message;
};

module.exports = errorHandler;
