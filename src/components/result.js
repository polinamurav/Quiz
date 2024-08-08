export class Result {
    constructor() {
        let that = this;
        const url = new URL(location.href);
        // const testId = url.searchParams.get('id');
        const testId = localStorage.getItem('testId');
        const score = url.searchParams.get('score');
        const total = url.searchParams.get('total');

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