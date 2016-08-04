'use strict';
/**
 * logic
 * @param  {} []
 * @return {}     []
 */
export default class extends think.logic.base {
    /**
     * authapi action logic
     * @return {} []
     */
    async __before() {
        this.allowMethods = 'post';
        let url = this.http.url;
        let user = await this.session('userInfo');
        if (!user) {
            return this.fail('LOGIN_ERROR');
        }
        if (!this.isAjax('post')) {
            let error = new Error("this page is not found");
            this.http.error = error;
            return think.statusAction(404, this.http)
        }
        let data = await this.model('authapi').isAuth(user.role_id);
        if (think.isEmpty(data)) {
            return this.fail('PURVIEW_ERROR');
        }
    }
    async authAction() {
        this.allowMethods = 'post';
    }
    async detailAction() {
        this.allowMethods = 'post';
        let rules = {
            user_id: 'string|required'
        }
        let flag = this.validate(rules);
        if (!flag) {
            return this.fail('PARSE_ERROR');
        }
    }
}
