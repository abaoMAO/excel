import React, { Component } from "react";

import { Form, Input, DatePicker, Radio } from "antd";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false
  };

  render() {
    /**
     * projectId:项目id
     * status：任务状态
     */
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { xs: { span: 24 }, sm: { span: 8 } },
      wrapperCol: { xs: { span: 24 }, sm: { span: 16 } }
    };

    /**
 *   `taskId` int(11) NOT NULL AUTO_INCREMENT COMMENT '任务id',
  `task` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '任务名称',
  `beforePercent` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '上周完成率',
  `planPercent` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '计划完成率',
  `planDate` datetime(6) DEFAULT NULL COMMENT '计划完成日期',
  `leader` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '任务负责人',
  `department` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '需求部门',
  `developer` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '人员',
  `requireDate` datetime(6) DEFAULT NULL COMMENT '要求完成时间',
  `isDelay` int(1) DEFAULT NULL COMMENT '是否延期',
  `delayMomo` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '延期备忘',
  PRIMARY KEY (`taskId`)
 */
    return (
      <Form>
        <FormItem {...formItemLayout} label="任务名称">
          {getFieldDecorator("task", {
            rules: [
              {
                required: true,
                message: "请填写任务名称"
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="上周完成率">
          {getFieldDecorator("beforePercent", {
            rules: [
              {
                required: true,
                message: "请填写上周完成率"
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="计划完成率">
          {getFieldDecorator("planPercent", {
            rules: [
              {
                required: true,
                message: "请填写计划完成率"
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="计划完成日期">
          {getFieldDecorator("planDate", {
            rules: [
              {
                type: "object",
                required: true,
                message: "请填写计划完成日期"
              }
            ]
          })(<DatePicker />)}
        </FormItem>
        <FormItem {...formItemLayout} label="任务负责人">
          {getFieldDecorator("developer", {
            rules: [
              {
                required: true,
                message: "请填写任务负责人"
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="需求部门">
          {getFieldDecorator("department", {
            rules: [
              {
                required: true,
                message: "请填写需求部门"
              }
            ]
          })(<Input />)}
        </FormItem>

        <FormItem {...formItemLayout} label="人员">
          {getFieldDecorator("leader", {
            rules: [
              {
                required: true,
                message: "请填写人员"
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="要求完成时间">
          {getFieldDecorator("requireDate", {
            rules: [
              {
                type: "object",
                required: true,
                message: "请填写要求完成时间"
              }
            ]
          })(<DatePicker />)}
        </FormItem>
        <FormItem {...formItemLayout} label="是否延期">
          {getFieldDecorator("isDelay", {
            rules: [
              {
                required: true,
                message: "请选择是否延期"
              }
            ]
          })(
            <RadioGroup>
              <Radio value="0">否</Radio>
              <Radio value="1">是</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="延期备忘">
          {getFieldDecorator("delayMomo")(<Input />)}
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(RegistrationForm);
