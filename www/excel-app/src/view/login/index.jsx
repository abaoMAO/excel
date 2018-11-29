import React, { Component } from "react";
import "./login.css";
import LoginForm from "./loginForm";
import loginBg from "../../components/img/login-bg.jpg";

class Login extends Component {
  render() {
    return (
      <div className="login-page">
            <img src={loginBg} alt="" className="login-bg" />
        <div className="login-form">
          <LoginForm />
        </div>
      </div>
    );
  }
}

export default Login;
