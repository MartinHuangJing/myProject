'use strict';
import Base from './base.js';
export default class extends Base {
  async indexAction() {
    let user = await this.isLogin();
    let role_id = user.role_id;
    let result  = await this.model('index').getMenu(role_id);
    if(think.isEmpty(result)){
      result.push({name:'使用通知',href:'/index/notice',icon:'envelope'})
    }
    this.assign({'username': user.login_name,'result':result});
    return this.display()
  }
  async noticeAction(){
    return this.display()
  }
}
