const Base = require('./base.js');
const response = require("../util/response");

module.exports = class extends Base {
  indexAction() {
    return this.display();
  }
  async loginAction() {
    let params = this.post();
    let user = this.model("user"); // controller 里实例化模型
    let data = (await user.getUserInfo(params))[0];
    if (data) {
      await this.session('userInfo', data);
      this.body = response.success(data, "登录成功");
    } else {
      this.body = response.fail("工号不存在");
    }
  }
  async loginOutAction() {
    let data = await this.session(null);
    this.body = response.success(data, "成功登出");
  }
  async addUserAction() {
    let params = this.post();
    let user = this.model("user"); // controller 里实例化模型
    let userInfo = await this.session('userInfo');
    let groupId = userInfo.groupId;
    let data = await user.addUser({ ...params,
      groupId
    });
    if (data) {
      this.body = response.success(data, "添加成员成功");
    } else {
      this.body = response.fail("工号不存在");
    }
  }
};