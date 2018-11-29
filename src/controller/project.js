const Base = require("./base.js");
const response = require("../util/response");
const ejsExcel = require("ejsExcel");
const fs = require("fs");
const path = require("path");

module.exports = class extends Base {
    async updateProjectAction() {
        let userInfo = await this.session('userInfo');
        let groupId = userInfo.groupId;
        let params = { ...this.post(),
            groupId
        };
        if (params.hasOwnProperty("projectId")) {
            this.body = await this.editProjectAction(params);
        } else {
            this.body = await this.addProjectAction(params);
        }
    }
    async addProjectAction(params) {
        let project = this.model("project"); // controller 里实例化模型
        let data = await project.addProject(params);
        if (data) {
            return response.success(data, "添加成功");
        } else {
            return response.fail();
        }
    }
    async editProjectAction(params) {
        let project = this.model("project");
        let data = await project.editProject(params);
        if (data) {
            return response.success(data, "修改成功");
        } else {
            return response.fail();
        }
    }
    async queryProjectListAction() {
        let project = this.model("project");
        let data = await project.queryProject();
        if (data) {
            this.body = response.success(data, "请求成功");
        } else {
            this.body = response.fail();
        }
    }
    async queryProjectJoinTaskListAction() {
        let userInfo = await this.session('userInfo');
        let groupId = userInfo.groupId;
        let status = this.get('status');
        let project = this.model("project");
        let data = await project.queryProject(groupId);
        let taskList = await this.filterData(JSON.parse(JSON.stringify(data)), status, false);
        if (taskList) {
            this.body = response.success(taskList, "请求成功");
        } else {
            this.body = response.fail();
        }
    }
    async delProjectAction() {
        let params = this.ctx.request.body.post;
        let project = this.model("project");
        let data = await project.delProject(params);
        if (data) {
            this.body = response.success(data, "删除成功");
        } else {
            this.body = response.fail();
        }
    }
    async downLoadExcelAction() {
        let userInfo = await this.session('userInfo');
        let groupId = userInfo.groupId;
        var exlBuf = fs.readFileSync(
            path.join(__dirname, "../../www/static/excel/template.xlsx")
        );
        let project = this.model("project");
        let data = await project.queryProject(groupId);
        let currentTask = await this.filterData(JSON.parse(JSON.stringify(data)), 1, true);
        let nextTask = await this.filterData(JSON.parse(JSON.stringify(data)), 2, true);

        let excelData = {
            department: {
                name: "数据可视化",
                leader: "王峥",
                number: "19"
            },
            brief: {
                overview: '暂时手动填写',
                memo: "暂时手动填写",
                currentRisk: "暂时手动填写",
                beforeRisk: "暂时手动填写"
            },
            currentContent: currentTask,
            nextContent: nextTask
        };

        let exlBuf2 = await ejsExcel.renderExcel(exlBuf, excelData);
        this.ctx.response.set("Content-Disposition", "attachment; filename=excel.xlsx");
        this.body = exlBuf2;
    }
    async filterData(data, status, isFilter) {
        // map里写异步函数有问题
        // let q =await data.map(async item => {
        //     let projectId = item.projectId;
        //     let v = await task.queryTaskList(projectId);
        //     console.log(v);
        //     item.details = v;
        //     return item;
        // });

        let task = this.model("task");
        for (let i = 0; i < data.length; i++) {
            let projectId = data[i].projectId;
            let v = await task.queryTaskList(projectId, status);
            data[i].details = v;
        }
        return data.filter(item => item.details.length > 0 || !isFilter);
    }
    testAction() {
        this.body = 123123123; // 返回在响应体里
    }
};