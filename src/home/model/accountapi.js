'use strict';
/**
 * model
 */
export default class extends think.model.base {
    async getAccountAuth(role_id) {
        let res = await think.cache('getaccountauth', () => {
            return this.auth(role_id);
        }, { timeout: 60 * 3600 })
        return res;
    }
    async auth(role_id) {
        let res = await this.model('sys_role_menu').alias("a")
            .where({
                'a.role_id': role_id
            }).join({
                table: 'sys_menu',
                join: 'left',
                as: 'c',
                on: ['a.menu_id', 'c.menu_id']
            }).where({ 'c.href': '/menu/account' }).find();
        return res;
    }
    async getList(parse) {
        let res;
        if (parse.username) {
            res = await model.cache('3600').page(parse.page, 12).where({
                username: ['like', '%' + username + '%']
            }).order('register_time DESC').countSelect();
        } else {
            res = await this.model('user').page(parse.page, 12).order('register_time DESC').countSelect();
        }
        return res;
    }
}