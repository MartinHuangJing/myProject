'use strict';
/**
 * model
 */
export default class extends think.model.base {
    async isAdmin(role_id) {
        let res = await think.cache('getadminauth', () => {
            return this.auth(role_id);
        }, { timeout: 60 * 3600 });
        return res;
    }
    async auth(role_id) {
        let data = await this.model('sys_role_menu').alias("a")
            .where({ 'a.role_id': role_id, 'c.href': '/menu/admin' })
            .join({
                table: 'sys_menu',
                join: 'left',
                as: 'c',
                on: ['a.menu_id', 'c.menu_id']
            }).find();
        return data;
    }
    async getAdminList(page) {
        let data = await this.model('sys_user').page(page, 12).where({ 'id': ['NOTIN', '2'] }).order('create_date DESC').countSelect();
        return data;
    }
    async getAdminUser(username, page) {
        let data = await model.page(page, 12).where({
            username: ['like', '%' + username + '%']
        }).where({ 'id': ['NOTIN', '2'] }).order('create_date DESC').countSelect();
        return data;
    }
    async getUserInfo(user_id) {
        let data = await this.model('sys_user').where({ 'id': user_id })
            .field('office,login_name,mobile,phone,name,company,remarks,role_id,create_date,update_date,id,email')
            .find();
        return data;
    }
    async getMenuList(role_id) {
        let data = await this.model('sys_role_menu').where({ 'role_id': role_id })
            .join('sys_menu on sys_menu.menu_id = sys_role_menu.menu_id')
            .field('sys_menu.menu_id,sys_menu.name,sys_role_menu.role_id')
            .select();
        return data;
    }
    async getAllMenu() {
        let res = await think.cache('getallmenu', () => {
            return this.allMenu();
        }, { timeout: 60 * 3600 })
        return res;
    }
    async allMenu() {
        let data = await this.model('sys_menu').field('menu_id,name').select();
        return data;
    }
    async getAllowMenu(hava_menu) {
        let data = await this.model('sys_menu').where({ 'menu_id': ['NOTIN', hava_menu] }).field('menu_id,name').select();
        return data;
    }
    async saveUserInfo(user_msg, thisDate) {
        let data = await this.model('sys_user').where({ id: user_msg.id }).update({
            login_name: user_msg.login_name,
            company: user_msg.company,
            name: user_msg.name,
            office: user_msg.office,
            email: user_msg.email,
            mobile: user_msg.email,
            phone: user_msg.phone,
            remarks: user_msg.remarks,
            update_date: think.datetime(user_msg.update_date)
        })
        return data;
    }
    async removeOldAuth(role_id) {
        let data = await this.model('sys_role_menu').where({ 'role_id': role_id }).delete();
        return data;
    }
    async addNewAuth(add_menu_arr) {
        let data = await this.model('sys_role_menu').addMany(add_menu_arr);
        return data;
    }
}