import React, { Component } from "react";
import { Button } from "antd";
import AddProjectModal from "./addProjectModal";

class AddProject extends Component {
  render() {
    return (
      <div>
        <Button type="primary" size="large" onClick={this.showModal.bind(this)}>
          新增项目
        </Button>
        <AddProjectModal ref="addProjectModal" {...this.props} />
      </div>
    );
  }
  showModal() {
    this.refs.addProjectModal.showModal();
  }
}

export default AddProject;
