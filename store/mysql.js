const mysql = require('mysql2');

const config = require('../config');

const dbconf1 = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
}

const dbconf2 = {
  host: 'database-amazon.crbbcspnfxi1.eu-west-3.rds.amazonaws.com',
  user: 'user',
  password: 'user1234',
  database: 'database-amazon',
  port: 3306,
}

const dbconf3 = {
  host: 'sql11.freesqldatabase.com',
  user: 'sql11435245',
  password: 'cghBeyaJ7F',
  database: 'sql11435245',
}

let connection;
function handleCon(){
  connection = mysql.createConnection(dbconf1);

  connection.connect(err => {
      if (err) {
          console.error('[db err]', err.stack);
          setTimeout(handleCon, 2000);
      } else {
          console.log('Connected to database as id: ', connection.threadId);
      }
      
  })

  connection.on('error', err => {
      console.error('[db err]', err);
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
          handleCon();
      } else {
          throw err;
      }
  })
}

handleCon();

  function list(table) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err, data) => {
            if (err) { return reject(err)}
            resolve(data);
        })
    })
}

function get(table, id) {
  return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM ${table} WHERE id="${id}"`, (err, data) => {
          if (err) { return reject(err)}
          resolve(data);
      })
  })
}

function insert(table, data) {
  return new Promise((resolve, reject) => {
      connection.query(`INSERT INTO ${table} SET ?`, data, (err, data) => {
          if (err) { return reject(err)}
          resolve(data);
      })
  })
}

function update(table, data) {
  return new Promise((resolve, reject) => {
      connection.query(`UPDATE ${table} SET ? WHERE id= ?`, [data, data.id], (err, data) => {
          if (err) { return reject(err)}
          resolve(data);
      })
  })
}

function upsert(table, data) { // Tienes que hacer este código más claro
  if (data.isNew) {
    delete data.isNew; // así no ocupa espacio en la BD
    console.log('[data]', data)
    return insert(table, data);
  } else if(data.id) { // esto pude dar BUGS
      if (data.isNew == false) {
        delete data.isNew;
        return update(table, data)
      }
    return update(table, data)
  } else {
    return insert(table, data);
  } 
}

function remove(table, id) {
  connection.query(`DELETE FROM ${table} WHERE id=${id}`, (err, data) => {
    if (err) {
      return reject(err);
    } resolve (data);
  })
}

function query(table, query, join) {
  let joinQuery = '';
  if (join) {
    const key = Object.keys(join)[0];
    const val = join[key];
    joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
    console.log(joinQuery);
  }

  return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ?`, query, (err, res) => {
        if (err) {return reject(err)}
        resolve(res[0] || null)
      })
    })
}






  module.exports = {
    list,
    get,
    upsert,
    remove,
    query,
  }
























