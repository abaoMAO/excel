import axios from 'axios'
import {
  notification
} from 'antd';

const openNotificationWithIcon = (type, message, description) => {
  notification[type]({
    message,
    description
  });
};

const ajax = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/' : '/',
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
});

ajax.interceptors.response.use(function (response) {
  if (!response.data.success) {
    openNotificationWithIcon('error', response.data.msg);
    return false;
  }else{
    openNotificationWithIcon('success', response.data.msg);
  }
  return response.data;
}, function (error) {
  openNotificationWithIcon('error', '请求错误', JSON.stringify(error));
  return Promise.reject(error);
});

export default (url = '', data = {}, type = "GET", config = {}) => {
  let dataType;
  type = type.toUpperCase();
  if (type === "GET") {
    dataType = "params"
  } else {
    dataType = "data"
  }
  const options = Object.assign({
    method: type,
    [dataType]: data,
    url,
  }, config);
  return ajax(options);
}