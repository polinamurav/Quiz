(function () {
    const Answers = {
        answer: null,
        init() {
            // checkUserData();
            const url = new URL(location.href);
            // const testId = url.searchParams.get('id');
            // if (testId) {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', 'https://testologia.ru/get-quiz-right?id=1', false);
                xhr.send();

                if (xhr.status === 200 && xhr.responseText) {
                    try {
                        this.answer = JSON.parse(xhr.responseText);
                        console.log(this.answer);
                    } catch (e) {
                        location.href = 'index.html';
                    }
                    this.checkAnswer();
                } else {
                    location.href = 'index.html';
                }
            // } else {
            //     location.href = 'index.html';
            // }
        },
        checkAnswer() {
            document.getElementById('answer-pre-title').innerText = this.answer.name;
        }
    }

    Answers.init();
})();