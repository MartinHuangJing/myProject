'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
  type: 'mysql',
  log_sql: true,
  log_connect: true,
  adapter: {
    mysql: {
      host: 'localhost',
      port: '3306',
      database: 'ybt',
      user: 'root',
      password: '1234',
      prefix: '',
      encoding: 'utf8'
    }
  }
};
