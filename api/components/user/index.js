// const store = require('../../../store/mysql.js');
const store = require('../../../store/remote-mysql');
const ctrl = require('./controller');

module.exports = ctrl(store); // lo hemos convertido en una función