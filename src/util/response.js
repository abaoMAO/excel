module.exports = {
    success: function (result, msg) {
        return {
            code: 1,
            msg: msg || '请求成功',
            result: result || null,
            success: true
        }
    },
    fail:function (msg) {
        return {
            code: 0,
            msg: msg || '请求失败',
            result:null,
            success: false
        }
    }
}