const orm = require('../config/orm');

const burger = {
  selectAll: (cb) => {
    orm.selectAll('burgers', (res) => {
      cb(res);
    });
  },
  insertOne: (columnNames, columnValues, cb) => {
    orm.insertOne('burgers', columnNames, columnValues, (res) => {
      cb(res);
    });
  },
  updateOne: (objectColumnValues, condition, cb) => {
    orm.updateOne('burgers', objectColumnValues, condition, (res) =>{
      cb(res);
    });
  },
  delete: (condition, cb) => {
    orm.delete("burgers", condition, (res) => {
      cb(res);
    });
  }
};

module.exports = burger;
