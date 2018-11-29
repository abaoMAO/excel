import React, { Component } from "react";
import { Modal } from "antd";
import AddUserForm from "./addUserForm";
import { addUser } from "../../server/api";

class AddTask extends Component {
  state = {
    ModalText: "Content of the modal",
    visible: false,
    confirmLoading: false
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({
      confirmLoading: true
    });
    const AddUserForm = this.refs.addUserForm;
    AddUserForm.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        let isManger = 0;
        let res = await addUser({ ...values, isManger });
        if (res && res.success) {
          // 添加任务成功
          this.setState({ visible: false, confirmLoading: false });
          AddUserForm.resetFields();
        } else {
          this.setState({ confirmLoading: false });
        }
      } else {
        this.setState({ confirmLoading: false });
      }
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { visible, confirmLoading } = this.state;
    return (
      <div>
        <Modal
          title="新增项目"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <AddUserForm ref="addUserForm" />
        </Modal>
      </div>
    );
  }
}

export default AddTask;
