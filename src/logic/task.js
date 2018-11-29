module.exports = class extends think.Logic {
  updateTaskAction() {
    this.allowMethods = 'post'; //  只允许 POST 请求类型
    let params = this.ctx.request.body.post;
    let rules = Object.create(null);
    if (params.hasOwnProperty('taskId')) {
      // 修改
      rules = {
        taskId: {
          required: true, // 字段必填
        }
      }
    } else {
      // 新增
      rules = {
        projectId: {
          required: true, // 字段必填
        }
      }
    }
    let flag = this.validate(rules);
    if (!flag) {
      return this.fail('validate error', this.validateErrors);
    }
  }
};