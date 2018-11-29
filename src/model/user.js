module.exports = class extends think.Model {
    getUserList() {
        return this.query('select * from user');
    }
    getUserInfo(params) {
        let number = params.number;
        let sql = `select * from user where number=${number}  limit 0,1`;
        return this.query(sql);
    }
    addUser(params) {
        let sql = `INSERT INTO user (number, name, groupId, isManger) VALUES ('${params.number}','${params.name}','${params.groupId}','${params.isManger}')`;
        return this.query(sql);
    }
}