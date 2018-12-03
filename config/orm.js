const connection = require('./connection.js');

const printQuestionMarks = (num) => {
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push('?');
  }
  return arr.toString();
};

const objToSql = (object) => {
  let arr = [];
  for (let key in object) {
    let value = object[key];
    if (Object.hasOwnProperty.call(object, key)) {
      if (typeof value === 'string' && value.indexOf(' ') >= 0) {
        value = `'${value}'`;
      }
      arr.push(`${key}=${value}`);
    }
  }
  return arr.toString();
};

const orm = {
  selectAll: (tableName, cb) => {
    let queryString = `SELECT * FROM ${tableName};`;
    connection.query(queryString, (err, res) => {
      if (err) throw err;
      cb(res);
    });
  },
  insertOne: (tableName, columnNames, columnValues, cb) => {
    let columnNameSting = columnNames.toString();
    let questionMarks = printQuestionMarks(columnValues.length);
    let queryString = `INSERT INTO ${tableName} (${columnNameSting}) VALUES (${questionMarks});`;
    console.log(queryString);
    connection.query(queryString, columnValues, (err, result) => {
      if (err) throw err;
      cb(result);
    });
  },
  updateOne: (tableName, objectColumnValues, condition, cb) => {
    let objectToSQL = objToSql(objectColumnValues);
    let queryString = `UPDATE ${tableName} SET ${objectToSQL} WHERE ${condition};`;
    console.log(queryString);
    connection.query(queryString, (err, result) => {
      if (err) throw err;
      cb(result);
    });
  },
  delete: (tableName, condition, cb) => {
    let queryString = `DELETE FROM ${tableName} WHERE ${condition};`;
    connection.query(queryString, (err, result) => {
      if (err) throw err;
      cb(result);
    });
  }
};

module.exports = orm;