'use strict';

/**
 * session configs
 */
export default {
  name: 'BOSS',
  type: 'file',
  secret: 'W~7()251',
  timeout: 24 * 3600,
  cookie: { // cookie options
    length: 32,
    httponly: true
  },
  adapter: {
    file: {
      path: think.getPath('common', 'runtime') + '/session',
    }
  }
};