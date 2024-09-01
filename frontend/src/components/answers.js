import {UrlManajer} from "../utils/url-manajer.js";
import {Auth} from "../services/auth.js";
import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";

export class Answers {
    constructor() {
        this.answer = null;
        this.quiz = null;
        this.optionsElement = null;
        this.userAnswers = null;

        let that = this;
        this.routeParams = UrlManajer.getQueryParams();

        this.init();
    }

    async init() {
        const userInfo = Auth.getUserInfo();
        if (!userInfo) {
            location.href = '#/';
        }

        if (this.routeParams.id) {
            try {
                const result = await CustomHttp.request(config.host + '/tests/' + this.routeParams.id + '/result/details/?userId=' + userInfo.userId);

                if (result) {
                    if (result.error) {
                        throw new Error(result.error);
                    }
                    // this.answer = result.correctAnswers;
                    // this.quiz = result;
                    this.quiz = result.test;
                    this.displayAnswer();
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            location.href = '#/';
        }
    }

    displayAnswer() {
        let that = this;
        this.userAnswers = JSON.parse(localStorage.getItem('userAnswers'));
        console.log(this.userAnswers);

        const myResultLink = document.getElementById('my-result');
        myResultLink.addEventListener('click', function () {
            // console.log(that, this);
            that.complete();
        })

        this.optionsElement = document.getElementById('options');
        this.optionsElement.innerHTML = ''; //очищаем его и удаляем все варианты ответов старые

        document.getElementById('answer-pre-title').innerText = this.quiz.name;

        const userInfo = Auth.getUserInfo();
        const userEmail = localStorage.getItem('userEmail');
        if (userInfo) {
            document.getElementById('answers-title-name').innerText = `${userInfo.fullName}, ${userEmail}`;
        }

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

                    if (answer.correct) {
                        if (userAnswer && userAnswer.chosenAnswerId === answer.id) {
                            //если выбрали правильный ответ
                            optionElement.classList.add('correct');
                            inputElement.classList.add('correct');
                        } else {
                            optionElement.classList.add('correct');
                            inputElement.classList.add('correct');
                        }
                    } else {
                        if (userAnswer && userAnswer.chosenAnswerId === answer.id) {
                            optionElement.classList.add('incorrect');
                            inputElement.classList.add('incorrect');
                        }
                    }

                    const labelElement = document.createElement('label');
                    labelElement.setAttribute('for', 'answer-' + answer.id);
                    labelElement.innerText = answer.answer;

                    optionElement.appendChild(inputElement);
                    optionElement.appendChild(labelElement);
                    optionsElement.appendChild(optionElement);
                }
            )
            questionElement.appendChild(questionTitleElement);
            questionElement.appendChild(optionsElement);
            this.optionsElement.appendChild(questionElement);
        })
    }

    async complete() {
        const userInfo = Auth.getUserInfo();
        if (!userInfo) {
            location.href = '#/';
        }

        location.href = '#/result?id=' + this.routeParams.id;
    }
}