/**
 * 统一成功响应格式
 * @param {object} res - Express response 对象
 * @param {*} data - 返回给前端的数据
 * @param {number} statusCode - HTTP 状态码，默认 200
 */
function success(res, data = {}, statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    data,
  });
}

/**
 * 统一错误响应格式
 * @param {object} res - Express response 对象
 * @param {string} message - 错误提示信息
 * @param {number} statusCode - HTTP 状态码，默认 400
 */
function error(res, message = "服务器错误", statusCode = 400) {
  return res.status(statusCode).json({
    success: false,
    message,
  });
}

module.exports = { success, error };
