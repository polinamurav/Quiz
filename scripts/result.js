(function () {
    const Result = {
        init() {
            let that = this;
            const url = new URL(location.href);
            // const testId = url.searchParams.get('id');
            const testId = localStorage.getItem('testId');

            document.getElementById('result-score').innerText = url.searchParams.get('score')
                + '/' + url.searchParams.get('total');

            const seeResultLink = document.getElementById('see-result');
            seeResultLink.onclick = function () {
                that.seeResult(testId);
            }
        },
        seeResult(testId) {
            if (testId) {
                location.href = 'answers.html?id=' + testId;
            }
        }
    }

    Result.init();
})();