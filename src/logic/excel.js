module.exports = class extends think.Logic {
    __before() {}
    indexAction() {
        // todo
    }
    updateProjectAction() {
        this.allowMethods = 'post'; //  只允许 POST 请求类型
    }
    __after() {}
}