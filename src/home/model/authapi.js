'use strict';
/**
 * model
 */
export default class extends think.model.base {
    async isAuth(role_id) {
        let res = await think.cache('getauth', () => {
            return this.auth(role_id);
        }, { timeout: 60 * 3600 });
        return res;
    }
    async auth(role_id) {
        let data = await this.model('sys_role_menu').alias("a")
            .where({ 'a.role_id': role_id, 'c.href': '/menu/auth' })
            .join({
                table: 'sys_menu',
                join: 'left',
                as: 'c',
                on: ['a.menu_id', 'c.menu_id']
            }).find();
        return data;
    }
    async getList(parse) {
        let page = parseInt(parse.page);
        let KEY = parse.KEY;
        let VAL = parse.VAL;
        let data;
        if (KEY && VAL) {
            let query;
            switch (KEY) {
                case 'username':
                    query = { 'username': ['like', '%' + VAL + '%'] };
                    break;
                case 'id_card':
                    query = { 'id_card': ['like', '%' + VAL + '%'] };
                    break;
                case 'realname':
                    query = { 'realname': ['like', '%' + VAL + '%'] };
                    break;
                case 'medicare_no':
                    query = { 'a.medicare_no': ['like', '%' + VAL + '%'] };
                    break;
            }
            data = await this.model('verification_apply').alias('a').join({
                table: 'user',
                join: 'left',
                as: 'b',
                on: ['a.user_id', 'b.id']
            }).page(page, 12).where(query).order('a.update_time DESC').countSelect();
        } else {
            data = await this.model('verification_apply').alias('a').join({
                table: 'user',
                join: 'left',
                as: 'b',
                on: ['a.user_id', 'b.id']
            }).page(page, 12).order('a.update_time DESC').countSelect();
        }
        return data;
    }
}