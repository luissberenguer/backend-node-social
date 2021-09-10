const store = require('../../../store/mysql.js');
const ctrl = require('./controller');

module.exports = ctrl(store); // lo hemos convertido en una función