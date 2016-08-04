'use strict';

import Base from './base.js';

export default class extends Base {
  async loginAction() {
    let data = this.post();
    console.log(data)
    let username = data.username;
    let password = think.md5('boss_' + data.password); 
    let  result  = await this.model('sys_user').where({'login_name': username,'password':password}).find();
    if (think.isEmpty(result)) {
      this.fail('ACCOUNT_ERROR');
    }else{
      await  this.session('userInfo',  result);  
      this.fail('SUCCESS');
    }
  }
  async loginoutAction(){
    await this.session();
    return this.redirect('/');
  }

}
