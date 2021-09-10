const remote = require('./remote.js')
const config = require('../config');

module.exports = new remote(config.mysqlService.host, config.mysqlService.port);