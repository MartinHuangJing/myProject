'user strict'
import Base from './base.js';
export default class extends Base {
  async authAction() {
    let parse = this.post();
    let res = await this.model('authapi').getList(parse);
    return this.json(res);
  }
  async detailAction() {
    let parse = this.post();
    let data = await this.model('userinfo').alias('a').where({
      'a.user_id': parse.user_id
    }).join({
        table:'user',
        join:'left',
        as:'b',
        on:['a.user_id','b.id']
    }).find();
    return this.json(data);
  }

}
