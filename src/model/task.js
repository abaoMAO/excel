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
module.exports = class extends think.Model {
    addTask(params) {
        let sql = `INSERT INTO task (projectId, task, beforePercent, planPercent, planDate, leader, department, developer, requireDate, isDelay, delayMomo, status) VALUES
        ('${params.projectId}', '${params.task}', '${params.beforePercent}', '${params.planPercent}', '${params.planDate}', '${params.leader}', '${params.department}', '${params.developer}', '${params.requireDate}', '${params.isDelay}', '${params.delayMomo||"无"}', '${params.status}')
        `;
        return this.query(sql);
    }
    editTask(params) {
        let sql = `UPDATE task
        SET task = "${params.task}",
        beforePercent = "${params.beforePercent}",
        planPercent = "${params.planPercent}",
        planDate = "${params.planDate}",
        leader = "${params.leader}",
        department = "${params.department}",
        developer = "${params.developer}",
        requireDate = "${params.requireDate}",
        isDelay = "${params.isDelay}",
        delayMomo = "${params.delayMomo}"
        WHERE taskId=${params.taskId}`;
        return this.query(sql);
    }
    delTask(params) {
        let sql = `DELETE FROM task WHERE taskId=${params.taskId}`;
        return this.query(sql);
    }
    queryTaskList(projectId, status) {
        // let sql = `select *,if(isDelay=0,"否","是") as  isDelayTxt from task where projectId=${projectId} and status=${status}`;
        let sql = `select *,
        case isDelay when 0 then "否"
             when 1 then "是"
             end as isDelayTxt
        from task where projectId=${projectId} and status=${status}`;
        return this.query(sql);
    }
}