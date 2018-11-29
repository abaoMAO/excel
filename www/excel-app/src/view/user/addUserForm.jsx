import React from "react";
import { Form, Input } from "antd";
const FormItem = Form.Item;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { xs: { span: 24 }, sm: { span: 8 } },
      wrapperCol: { xs: { span: 24 }, sm: { span: 16 } }
    };
    return (
      <Form>
        <FormItem {...formItemLayout} label="成员工号">
          {getFieldDecorator("number", {
            rules: [
              {
                required: true,
                message: "请填写成员工号"
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="成员名称">
          {getFieldDecorator("name", {
            rules: [
              {
                required: true,
                message: "请填写成员名称"
              }
            ]
          })(<Input />)}
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(RegistrationForm);
