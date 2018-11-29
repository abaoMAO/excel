import React, { Component } from "react";
import { Modal } from "antd";
import AddTaskForm from "./addTaskForm";
import { updateTask } from "../../server/api";
import Moment from "moment";

class AddTask extends Component {
  state = {
    ModalText: "Content of the modal",
    visible: false,
    confirmLoading: false
  };

  showModal = formData => {
    this.setState({
      visible: true
    });
    if (this.props.taskId) {
      this.fillForm(formData);
    }
  };

  handleOk = () => {
    this.setState({
      confirmLoading: true
    });
    let addTaskForm = this.refs.addTaskForm;
    addTaskForm.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const { projectId, status, taskId } = this.props;
        console.log(projectId, status);
        let res = await updateTask({ ...values, projectId, status, taskId });
        if (res && res.success) {
          // 添加任务成功
          this.props.refresh();
          this.setState({ visible: false, confirmLoading: false });
          addTaskForm.resetFields();
        } else {
          this.setState({ confirmLoading: false });
        }
      } else {
        this.setState({ confirmLoading: false });
      }
    });
  };
  fillForm = formData => {
    setTimeout(() => {
      let addTaskForm = this.refs.addTaskForm;
      addTaskForm.setFieldsValue({
        task: formData.task,
        beforePercent: formData.beforePercent,
        delayMomo: formData.delayMomo,
        department: formData.department,
        developer: formData.developer,
        isDelay: formData.isDelay.toString(),
        leader: formData.leader,
        planDate: Moment(new Date(formData.planDate)),
        planPercent: formData.planPercent,
        requireDate: Moment(new Date(formData.requireDate))
      });
    }, 0);
  };
  handleCancel = () => {
    let addTaskForm = this.refs.addTaskForm;
    addTaskForm.resetFields();
    this.setState({
      visible: false
    });
  };

  render() {
    const { visible, confirmLoading } = this.state;
    return (
      <div>
        <Modal
          title="新增任务"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <AddTaskForm ref="addTaskForm" />
        </Modal>
      </div>
    );
  }
}

export default AddTask;
