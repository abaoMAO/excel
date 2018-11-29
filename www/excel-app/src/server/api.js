import fetch from './ajax'

export const queryProjectList = () => fetch('/project/queryProjectList');
// export const downLoadExcel = () => fetch('/project/downLoadExcel');
export const queryTaskList = (projectId, status) => fetch('/task/queryTaskList', {
    projectId: projectId,
    status: status
});

// 查询项目列表
export const queryProjectJoinTaskList = (status) => fetch('/project/queryProjectJoinTaskList', {
    status: status
});

// 新增修改项目
export const updateProject = (params) => fetch('/project/updateProject', {
    ...params
}, 'POST');

// 新增修改任务
export const updateTask = (params) => fetch('/task/updateTask', {
    ...params
}, 'POST');

// 删除任务
export const delTask = (taskId) => fetch('/task/delTask', {
    taskId
}, 'POST');

// 登录接口
export const userLogin = (params) => fetch('/user/login', {
    ...params
}, 'POST');

// 登出接口
export const loginOut = () => fetch('/user/loginOut');



// 添加成员
export const addUser = (params) => fetch('/user/addUser', {
    ...params
}, 'POST');