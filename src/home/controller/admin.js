'user strict'
import Base from './base.js';
export default class extends Base {
    async userAction() {
        let parse = this.post();
        let page = parseInt(parse.page);
        let username = parse.username;
        let data;
        if (username) {
            data = await this.model('admin').getAdminUser(username, page);
        } else {
            data = await this.model('admin').getAdminList(page);
        }
        return this.json(data);
    }
    async detailAction() {
        let parse = this.post();
        let hava_menu = [];
        let user_id = parse.user_id;
        let role_id = parse.role_id;
        let result = {};
        let allow_menu = [];
        let user_info = await this.model('admin').getUserInfo(user_id);
        let menu_result = await this.model('admin').getMenuList(role_id);
        if (think.isEmpty(menu_result)) {
            allow_menu = await this.model('admin').getAllMenu();
        } else {
            menu_result.forEach(function (item, index) {
                hava_menu.push(item.menu_id)
            })
            allow_menu = await this.model('admin').getAllowMenu(hava_menu);
        }

        result.user_info = user_info;
        result.this_auth = menu_result;
        result.allow_auth = allow_menu;
        return this.json(result);
    }
    async deleteAction() {

    }
    async savaAction() {
        let parse = this.post();
        let user_msg = JSON.parse(parse.userInfo);
        let thisAuth = JSON.parse(parse.thisAuth);
        let oldAuth = JSON.parse(parse.oldAuth);
        console.log(parse.thisAuth != parse.oldAuth);
        let update_user = await this.model('admin').saveUserInfo(user_msg);
        if (parse.thisAuth != parse.oldAuth) {
            let remove_auth = await this.model('admin').removeOldAuth(user_msg.role_id);
            if (!think.isEmpty(thisAuth)) {
                let add_menu_arr = [];
                thisAuth.forEach(function (item, index) {
                    add_menu_arr.push({ role_id: user_msg.role_id, menu_id: item.menu_id })
                })
                let add_auth = await this.model('admin').addNewAuth(add_menu_arr);
            }

        }
        return this.fail('SUCCESS');
    }
}