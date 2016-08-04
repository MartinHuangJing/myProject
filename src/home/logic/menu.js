'use strict';
/**
 * logic
 * @param  {} []
 * @return {}     []
 */
export default class extends think.logic.base {
    init(http){
        super.init(http);
    }
    /**
     * menu action logic
     * @return {} []
     */

    async __before() {
        this.allowMethods = 'post';
        let url = this.http.url;
        if (!this.isAjax('post')) {
            let error = new Error("this page is not found");
            this.http.error = error;
            return think.statusAction(404, this.http)
        }

    }
    async accountAction() {
        this.allowMethods = 'post';
    }
    async authAction() {
        this.allowMethods = 'post';
    }
    async adminAction() {
        this.allowMethods = 'post';
    }
}
