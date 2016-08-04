'user strict';
import Base from './base.js';
export default class extends Base{
    async __before(){
        let user = await this.isLogin();
        if (!user) {
            return this.fail('LOGIN_ERROR');
        }

        let res = this.model('menu').isSelf(user.role_id);
        if (think.isEmpty(res)) {
            return this.fail('PURVIEW_ERROR');
        }
    }
    async accountAction() {
        return this.display();
    }
    async authAction() {
        return this.display();
    }
    async adminAction() {
        return this.display();
    }
}