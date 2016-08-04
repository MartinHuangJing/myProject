'use strict';

export default class extends think.controller.base {
  init(http){
    super.init(http);
  }
  /**
   * some base method in here
   */

  async isLogin(){
    let user = await this.session('userInfo');
    if (!user) {
      if(this.isGet()){
        return this.redirect('/user/login');
      }

    }else{
      return user;
    }
  }
}