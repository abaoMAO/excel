import React, { Component } from "react";
import { Button } from "antd";

class DownLoad extends Component {
  render() {
    return (
      <div>
        <Button type="primary" size="large" onClick={this.downLoadExcel}>
          下载Excel
        </Button>
      </div>
    );
  }
  downLoadExcel() {
    window.open(`http://${window.location.hostname}:8360/project/downLoadExcel`);
  }
}

export default DownLoad;
