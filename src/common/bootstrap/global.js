/**
 * this file will be loaded before server started
 * you can define global functions used in controllers, models, templates
 */

/**
 * use global.xxx to define global functions
 *
 * global.fn1 = function(){
 *
 * }
 */
global.adminMenuConfig = function() {
  return {
    username: 'admin',
    list: [{
      iconClass: 'user',
      title: '用户管理',
      url: '/index/account',
      active: true
    }, {
      iconClass: 'eye-open',
      title: '实名认证',
      url: '/index/account',
      active: false
    }, {
      iconClass: 'plus',
      title: '医保卡管理',
      url: '/index/account',
      active: false
    }, {
      iconClass: 'glass',
      title: '金融账户管理',
      url: '/index/account',
      active: false
    }, {
      iconClass: 'th-list',
      title: '新闻列表',
      url: '/index/account',
      active: false
    }, {
      iconClass: 'edit',
      title: '新闻发布',
      url: '/index/account',
      active: false
    }]
  }
}
