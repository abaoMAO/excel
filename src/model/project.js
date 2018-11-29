module.exports = class extends think.Model {
    addProject(params) {
        let sql = `INSERT INTO project (name, creater, groupId) VALUES ('${params.name}','${params.creater}','${params.groupId}')`;
        return this.query(sql);
    }
    editProject(params) {
        let sql = `UPDATE project
        SET name = "${params.name}",
        creater = "${params.creater}"
        WHERE projectId=${params.projectId}`;
        return this.query(sql);
    }
    delProject(params) {
        let sql = `DELETE FROM project WHERE projectId=${params.projectId}`;
        return this.query(sql);
    }
    queryProject(groupId) {
        let sql = `select * from project where groupId=${groupId}`;
        return this.query(sql);
    }
}