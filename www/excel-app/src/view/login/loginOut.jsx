import React, { Component } from "react";
import { Button } from "antd";
import { loginOut } from "../../server/api";
import { withRouter } from "react-router-dom";

class LoginOut extends Component {
  render() {
    return (
      <div>
        <Button type="primary" size="large" onClick={this.loginOut.bind(this)}>
          退出登录
        </Button>
      </div>
    );
  }
  async loginOut() {
    let res = await loginOut();
    if (res) {
      this.props.history.push("/login");
    }
  }
}

export default withRouter(LoginOut);
