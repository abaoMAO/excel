import React from "react";
import { Table, Button, Modal } from "antd";
import { delTask } from "../../server/api";

export default (record, queryProjectList, editTask) => {
  const taskList = record.details.map(item => {
    return {
      ...item,
      key: item.taskId
    };
  });
  const columns = [
    { title: "任务名称", dataIndex: "task", key: "task" },
    { title: "上周完成率", dataIndex: "beforePercent", key: "beforePercent" },
    { title: "计划完成率", dataIndex: "planPercent", key: "planPercent" },
    { title: "计划完成日期", dataIndex: "planDate", key: "planDate" },
    { title: "任务负责人", dataIndex: "leader", key: "leader" },
    { title: "需求部门", dataIndex: "department", key: "department" },
    { title: "人员", dataIndex: "developer", key: "developer" },
    { title: "要求完成时间", dataIndex: "requireDate", key: "requireDate" },
    { title: "是否延期", dataIndex: "isDelayTxt", key: "isDelayTxt" },
    { title: "延期备忘", dataIndex: "delayMomo", key: "delayMomo" },
    {
      title: "操作",
      dataIndex: "operation",
      key: "operation",
      render: (text, row, index) => (
        <div>
          <Button
            type="danger"
            onClick={() => confirmDel(row, queryProjectList)}
          >
            删除
          </Button>
          <Button onClick={() => edit(row, queryProjectList, editTask)}>修改</Button>
        </div>
      )
    }
  ];

  return <Table columns={columns} dataSource={taskList} pagination={false} />;
};

function confirmDel(row, queryProjectList) {
  Modal.confirm({
    title: "提示",
    content: `确认删除这条任务（${row.task}）吗？`,
    okText: "确认",
    cancelText: "取消",
    onOk: async () => {
      let taskId = row.taskId;
      let res = await delTask(taskId);
      if (res && res.success) {
        queryProjectList();
      }
    }
  });
}
function edit(row, queryProjectList, editTask) {
  // console.log(row);
  // console.log(queryProjectList);
  editTask(row);
}