import React, { Component } from "react";
import AddProject from "./addProject";
import ProjectTable from "./table";
import DownLoad from "./downLoad";
import AddMember from "../user/addUser";
import LoginOut from "../login/loginOut";
import "./index.css";

class Excel extends Component {
  render() {
    return (
      <div>
        <div className="table-btn-group">
          <AddMember />
          <AddProject refreshTable={this.refreshTable.bind(this)} />
          <DownLoad />
          <LoginOut />
        </div>
        <h1>本周工作情况</h1>
        <ProjectTable status="1" ref="projectTable1" />
        <h1>下周工作计划 </h1>
        <ProjectTable status="2" ref="projectTable2" />
      </div>
    );
  }
  refreshTable() {
    this.refs.projectTable1.refreshTable();
    this.refs.projectTable2.refreshTable();
  }
}

export default Excel;
