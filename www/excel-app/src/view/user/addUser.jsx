import React, { Component } from "react";
import { Button } from "antd";
import AddUserModal from "./addUserModal";

class AddMember extends Component {
  render() {
    return (
      <div>
        <Button
          type="primary"
          size="large"
          ref="addUser"
          onClick={this.addUser.bind(this)}
        >
          添加组员
        </Button>
        <AddUserModal ref="addUserModal" {...this.props} />
      </div>
    );
  }
  addUser() {
    this.refs.addUserModal.showModal();
  }
}

export default AddMember;
