import React, { Component } from "react";
import { Table, Button } from "antd";
import { queryProjectJoinTaskList } from "../../server/api";
import AddTask from "./addTask";
import expandedRowRender from "./expandTable";

class ExcelTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectList: [],
      taskList: [],
      status: this.props.status
    };
  }
  render() {
    const columns = [
      { title: "项目名称", dataIndex: "name", key: "name" },
      {
        title: "操作",
        key: "operation",
        render: (text, record) => (
          <Button type="primary" onClick={() => this.addTask(record)}>
            新增任务
          </Button>
        )
      }
    ];
    return (
      <Table
        className="components-table-demo-nested"
        columns={columns}
        expandedRowRender={record =>
          expandedRowRender(
            record,
            this.queryProjectList.bind(this),
            this.editTask.bind(this)
          )
        }
        dataSource={this.state.projectList}
        pagination={false}
      />
    );
  }
  componentDidMount() {
    this.queryProjectList();
  }
  async queryProjectList() {
    let res = (await queryProjectJoinTaskList(this.state.status)).result;
    res.map(item => (item.key = item.projectId));
    this.setState({
      projectList: res
    });
  }
  addTask(record) {
    let projectId = record.projectId;
    this.props.openHandle({
      projectId,
      status: this.state.status
    });
  }
  editTask(row) {
    this.props.openHandle(row);
  }
}

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectId: null,
      status: this.props.status,
      taskId: null
    };
  }
  render() {
    return (
      <div>
        <AddTask
          ref="addTask"
          {...this.state}
          refresh={this.refreshTable.bind(this)}
        />
        <ExcelTable
          {...this.props}
          ref="excelTable"
          openHandle={this.open.bind(this)}
        />
      </div>
    );
  }
  open(formData) {
    this.setState({
      projectId: formData.projectId,
      taskId: formData.taskId
    });
    setTimeout(() => {
      this.refs.addTask.showModal(formData);
    }, 0);
  }
  refreshTable() {
    this.refs.excelTable.queryProjectList();
  }
}
