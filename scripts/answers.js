(function () {
    const Answers = {
        answer: null,
        quiz: null,
        optionsElement: null,
        init() {
            let that = this;
            // checkUserData();
            const url = new URL(location.href);
            const testId = url.searchParams.get('id');
            // if (testId) {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://testologia.ru/get-quiz-right?id='  + testId, false);
            xhr.send();
            if (xhr.status === 200 && xhr.responseText) {
                try {
                    this.answer = JSON.parse(xhr.responseText);
                    console.log(this.answer);
                    // that.checkAnswer(this);
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
            const url = new URL(location.href);
            const testId = url.searchParams.get('id');
            if (testId) {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', 'https://testologia.ru/get-quiz?id=' + testId, false);
                xhr.send();

                if (xhr.status === 200 && xhr.responseText) {
                    try {
                        this.quiz = JSON.parse(xhr.responseText);
                        console.log(this.quiz);
                    } catch (e) {
                        location.href = 'index.html';
                    }
                    this.displayAnswer();
                } else {
                    location.href = 'index.html';
                }
            } else {
                location.href = 'index.html';
            }

        },
        displayAnswer() {
            this.optionsElement = document.getElementById('options');
            this.optionsElement.innerHTML = ''; //очищаем его и удаляем все варианты ответов старые

            document.getElementById('answer-pre-title').innerText = this.quiz.name;

            this.quiz.questions.forEach((question, index) => {
                const questionElement = document.createElement('div');
                questionElement.className = 'answers-question';

                const questionTitleElement = document.createElement('div');
                questionTitleElement.className = 'answers-question-title common-question-title';
                questionTitleElement.innerHTML = '<span>Вопрос ' + (index + 1)
                    + ':</span> ' + question.question;
                // console.log(questionTitleElement);

                const optionsElement = document.createElement('div');
                optionsElement.className = 'answers-question-options';

                question.answers.forEach(answer => {
                    const optionElement = document.createElement('div');
                    optionElement.className = 'answers-question-option';

                    const inputElement = document.createElement('input');
                    inputElement.setAttribute('id', 'answer-' + answer.id);
                    inputElement.setAttribute('type', 'radio');
                    inputElement.setAttribute('name', 'answer');
                    inputElement.setAttribute('disabled', 'disabled');

                    const labelElement = document.createElement('label');
                    labelElement.setAttribute('for', 'answer-' + answer.id);
                    labelElement.innerText = answer.answer;

                    optionElement.appendChild(inputElement);
                    optionElement.appendChild(labelElement);
                    optionsElement.appendChild(optionElement);
                })
                questionElement.appendChild(questionTitleElement);
                questionElement.appendChild(optionsElement);
                this.optionsElement.appendChild(questionElement);
            })
        }
    }

    Answers.init();
})();