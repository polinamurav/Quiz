(function () {
    const Answers = {
        answer: null,
        quiz: null,
        optionsElement: null,
        userAnswers: null,
        init() {
            let that = this;
            const url = new URL(location.href);
            const testId = url.searchParams.get('id');

            if (testId) {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', 'https://testologia.ru/get-quiz-right?id=' + testId, false);
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
            } else {
                location.href = 'index.html';
            }
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
            let that = this;
            this.userAnswers = JSON.parse(localStorage.getItem('userAnswers'));
            console.log(this.userAnswers);

            const myResultLink = document.getElementById('my-result');
            myResultLink.click = function () {
                that.complete();
            }

            this.optionsElement = document.getElementById('options');
            this.optionsElement.innerHTML = ''; //очищаем его и удаляем все варианты ответов старые

            document.getElementById('answer-pre-title').innerText = this.quiz.name;

            const nameUser = JSON.parse(localStorage.getItem('userName'));
            document.getElementById('answers-title-name').innerText = nameUser;

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

                const userAnswer = this.userAnswers.find(user => user.questionId === question.id);

                question.answers.forEach(answer => {
                    const optionElement = document.createElement('div');
                    optionElement.className = 'answers-question-option';

                    const inputElement = document.createElement('input');
                    inputElement.setAttribute('id', 'answer-' + answer.id);
                    inputElement.setAttribute('type', 'radio');
                    inputElement.setAttribute('name', 'answer');
                    inputElement.setAttribute('disabled', 'disabled');


                    if (userAnswer && userAnswer.chosenAnswerId === answer.id) {
                        inputElement.checked = true;
                        if (this.answer.includes(answer.id)) {
                            optionElement.classList.add('correct');
                            inputElement.classList.add('correct');
                        }
                        else {
                            optionElement.classList.add('incorrect');
                            inputElement.classList.add('incorrect');
                        }
                    }
                    // if (this.answer.includes(answer.id)) {
                    //     inputElement.checked = true;
                    //     optionElement.classList.add('correct');
                    //     inputElement.classList.add('correct');
                    // }


                    // this.userAnswers.forEach(user => {
                    //     if (user.chosenAnswerId === answer.id) {
                    //         inputElement.checked = true;
                    //         optionElement.classList.add('incorrect');
                    //         inputElement.classList.add('incorrect');
                    //     }
                    // })
                    
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
        },
        complete() {
            const url = new URL(location.href);
            const id = url.searchParams.get('id');
            const name = url.searchParams.get('name');
            const lastName = url.searchParams.get('lastName');
            const email = url.searchParams.get('email');
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://testologia.ru/pass-quiz?id=' + id, false);
            xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            xhr.send(JSON.stringify({
                name: name,
                lastName: lastName,
                email: email,
                results: this.userResult
            }));

            if (xhr.status === 200 && xhr.responseText) {
                let result = null;
                try {
                    result = JSON.parse(xhr.responseText);
                } catch (e) {
                    location.href = 'index.html';
                }
                if (result) {
                    localStorage.setItem('testId', id);
                    localStorage.setItem('userAnswers', JSON.stringify(this.userResult));
                    location.href = 'result.html?score=' + result.score + '&total=' + result.total;
                }
            } else {
                location.href = 'index.html';
            }
        }
    }

    Answers.init();
})();