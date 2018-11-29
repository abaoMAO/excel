import React from "react";
import { Form, Icon, Input, Button } from "antd";
import { userLogin } from "../../server/api";
import { withRouter } from "react-router-dom";
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        let res = await userLogin(values);
        if (res) {
            this.props.history.push("/excel");
        }
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
        <FormItem>
          {getFieldDecorator("number", {
            rules: [{ required: true, message: "请填写你的工号!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="请填写工号"
            />
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: "100%" }}
          >
            登 录
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default withRouter(Form.create()(NormalLoginForm));
