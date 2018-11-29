const Base = require('./base.js');
const ejsExcel = require("ejsExcel");
const fs = require("fs");
const path = require("path");

module.exports = class extends Base {
  async indexAction() {
  }
  async addProjectAction() {
    console.log(this);
    this.body =123;
    
  }
};