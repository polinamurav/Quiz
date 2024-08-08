import {UrlManajer} from "../utils/url-manajer.js";

export class Result {
    constructor() {
        let that = this;
        this.routeParams = UrlManajer.getQueryParams();
        // const testId = url.searchParams.get('id');
        const testId = localStorage.getItem('testId');
        const score = this.routeParams.score;
        const total = this.routeParams.total;

        document.getElementById('result-score').innerText = score
            + '/' + total;

        const seeResultLink = document.getElementById('see-result');
        seeResultLink.onclick = function () {
            that.seeResult(testId);
        }
    }

    seeResult(testId) {
        if (testId) {
            location.href = 'answers.html?id=' + testId;
        }
    }
}