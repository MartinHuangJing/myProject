'user strict'
import Base from './base.js';
export default class extends Base {
  async accountAction() {
    //this.setCorsHeader();
    let parse = this.post();
    let data = await this.model('accountapi').getList(parse);
    return this.json(data);

  }
  async detailAction() {
    let parse = this.post();
    let data = await this.model('userinfo').where({
      'user_id': parse.user_id
    }).find();
    return this.json(data);
  }
  setCorsHeader(){
    this.header("Access-Control-Allow-Origin", this.header("origin") || "*");
    this.header("Access-Control-Allow-Headers", "x-requested-with");
    this.header("Access-Control-Request-Method", "GET,POST,PUT,DELETE");
    this.header("Access-Control-Allow-Credentials", "true");
  }
}
