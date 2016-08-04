'use strict';
/**
 * model
 */
export default class extends think.model.base {
    async getMenu(role_id) {
        let result = await this.model('sys_role_menu').where({
            'role_id': role_id
        }).join('sys_menu on sys_menu.menu_id = sys_role_menu.menu_id').select();
        return result;
    }
}