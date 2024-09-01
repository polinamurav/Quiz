import {UrlManajer} from "../utils/url-manajer.js";
import {CustomHttp} from "../services/custom-http";
import config from "../../config/config";
import {Auth} from "../services/auth";

export class Result {
    constructor() {
        let that = this;
        this.routeParams = UrlManajer.getQueryParams();
        const testId = this.routeParams.id;
        // const testId = localStorage.getItem('testId');
        const score = this.routeParams.score;
        const total = this.routeParams.total;

        this.init();

        const seeResultLink = document.getElementById('see-result');
        seeResultLink.onclick = function () {
            that.seeResult(testId);
        }
    }

    async init() {
        const userInfo = Auth.getUserInfo();
        if (!userInfo) {
            location.href = '#/';
        }

        if (this.routeParams.id) {
            try {
                const result = await CustomHttp.request(config.host + '/tests/' + this.routeParams.id + '/result?userId=' + userInfo.userId);

                if (result) {
                    if (result.error) {
                        throw new Error(result.error);
                    }

                    document.getElementById('result-score').innerText = result.score
                        + '/' + result.total;
                    return;
                }
            } catch (error) {
                console.log(error);
            }
        }
        location.href = '#/';
    }

    seeResult(testId) {
        if (testId) {
            location.href = '#/answers?id=' + testId;
        }
    }
}