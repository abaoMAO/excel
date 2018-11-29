import React, { Component } from "react";
import { Modal } from "antd";
import AddProjectForm from "./addProjectForm";
import { updateProject } from "../../server/api";

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
    const addProjectForm = this.refs.addProjectForm;
    addProjectForm.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        let creater = 18044854;
        let res = await updateProject({ ...values, creater });
        if (res && res.success) {
          // 添加任务成功
          this.props.refreshTable();
          this.setState({ visible: false, confirmLoading: false });
          addProjectForm.resetFields();
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
          <AddProjectForm ref="addProjectForm" />
        </Modal>
      </div>
    );
  }
}

export default AddTask;
