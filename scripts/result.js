(function () {
    const Result = {
        init() {
            let that = this;
            const url = new URL(location.href);
            document.getElementById('result-score').innerText = url.searchParams.get('score')
                + '/' + url.searchParams.get('total');
            const seeResultLink = document.getElementById('see-result');
            seeResultLink.onclick = function () {
                that.seeResult(this);
            }
        },
        seeResult(element) {
            const url = new URL(location.href);
            location.href = 'answers.html?' + '&id=1';
        }
    }

    Result.init();
})();