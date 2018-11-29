const Base = require('./base.js');
const response = require('../util/response')

module.exports = class extends Base {
  async updateTaskAction() {
    let params = this.ctx.request.body.post;
    if (params.hasOwnProperty('taskId')) {
      this.body = await this.editTaskAction(params);
    } else {
      this.body = await this.addTaskAction(params);
    }
  }
  async addTaskAction(params) {
    let task = this.model('task'); // controller 里实例化模型
    let data = await task.addTask(params);
    if (data) {
      return response.success(data, '添加成功');
    } else {
      return response.fail();
    }
  }
  async editTaskAction(params) {
    let task = this.model('task');
    let data = await task.editTask(params);
    if (data) {
      return response.success(data, '修改成功');
    } else {
      return response.fail();
    }
  }
  async queryTaskListAction() {
    let params = this.get()
    let task = this.model('task'); // controller 里实例化模型
    let data = await task.queryTaskList(params.projectId, params.status);
    if (data) {
      this.body = response.success(data, '请求成功');
    } else {
      this.body = response.fail();
    }
  }
  async delTaskAction() {
    let params = this.ctx.request.body.post;
    let task = this.model('task');
    let data = await task.delTask(params);
    if (data) {
      this.body = response.success(data, '删除成功');
    } else {
      this.body = response.fail();
    }
  }
  async taskAction() {
    let task = this.model('task'); // controller 里实例化模型
    let data = await task.queryTaskList();
    if (data) {
      this.body = response.success(data, '请求成功');
    } else {
      this.body = response.fail();
    }
  }
};