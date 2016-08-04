'use strict';
/**
 * logic
 * @param  {} []
 * @return {}     []
 */
export default class extends think.logic.base {
  init(http){
    super.init(http);
  }
  /**
   * user action logic
   * @return {} []
   */
  async loginAction() {
    this.allowMetheds = 'get,post';
    if (this.isPost()) {
      let rules = {
        username: 'string|required',
        password: 'string|required'
      };
      let flag = this.validate(rules);
      if (!flag) {
        return this.fail('ACCOUNT_EMPTY');
      }
      let url = this.http.url;
      if (url != '/user/login') {
        this.fail('LIMIT');
      }
    } else {
      let user = await this.session('userInfo');
      if (user) {
        return this.redirect('/');
      } else {
        return this.display();
      }
    }
  }
}
