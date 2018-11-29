const response = require("../util/response");

module.exports = (options, app) => {
    return async (ctx, next) => {
        let userInfo = await ctx.session('userInfo');
        if (userInfo) return next();
        ctx.body = response.fail("请先登录");
    }
}