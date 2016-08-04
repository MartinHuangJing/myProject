'use strict';
/**
 * model
 */
export default class extends think.model.base {
    async isSelf(role_id) {
        let result = await this.model('sys_role_menu').alias("a")
            .where({
                'a.role_id':role_id
            }).join({
                table:'sys_menu',
                join:'left',
                as:'c',
                on:['a.menu_id','c.menu_id']
            }).where({ 'c.href': url }).find();
        return result;
    }
}