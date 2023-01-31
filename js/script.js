const DATA = [
    {
        qustion: 'Столица России',
        answers: [
            {
                id: '1',
                value: 'Москва',
                correct: true
            },
            {
                id: '2',
                value: 'Санкт-Петербург',
                correct: false
            },
            {
                id: '3',
                value: 'Воронеж',
                correct: false
            }

        ]
    },
    {
        qustion: 'Президент Росии',
        answers: [
            {
                id: '4',
                value: 'Путин В.В',
                correct: true
            },
            {
                id: '5',
                value: 'Путин В.В',
                correct: true
            }

        ]
    },
    {
        qustion: 'Президент Росии',
        answers: [
            {
                id: '4',
                value: 'Путин В.В',
                correct: true
            },
            {
                id: '5',
                value: 'Путин В.В',
                correct: true
            }

        ]
    }
];

let ansResults = {
};

const quiz = document.getElementById('quiz');
const questions = document.getElementById('questions');
const results = document.getElementById('results');
const indicator = document.getElementById('indicator');
const btnNext = document.getElementById('btn-next');
const btnRestart = document.getElementById('btn-restart');

const renderQuestions = (index) => {
    renderIndicator(index + 1);

    questions.dataset.currentStep = index;

    const renderAnswers = () => DATA[index].answers
        .map((answer) => `
            <li>
                <label>
                    <input class="answer-input" type="radio" name=${index} value=${answer.id}>
                    ${answer.value}
                </label>
            </li>
            `
        )
        .join('');

    questions.innerHTML = `
        <div class="quiz-questions-item">
    <div class="quiz-questions-item__question"> ${DATA[index].qustion}</div>
    <ul class="quiz-questions-item__answers">${renderAnswers()}</ul>
    </div>
`;
};

const renderResults = () => {
    let content = '';

    const getClassName = (answer, questionIndex) => {
        let classname = '';

        if (!answer.correct && answer.id === ansResults[questionIndex]) {
            classname = 'answer--invalid';
        }
        else if (answer.correct) {
            classname = 'answer--valid';
        }

        return classname;
    };

    const getAnswers = (questionIndex) => {
        return DATA[questionIndex].answers.map((answer) => {
            return `<li class=${getClassName(answer, questionIndex)}>${answer.value}</li>`;
        })
            .join('');
    }

    DATA.forEach((qustion, index) => {
        content +=
            `
            <div class="quiz-results-item">
                <div class="quiz-results-item__question">
                    ${qustion.qustion}
                </div>
                <ul class="quiz-results-item__answers">
                   ${getAnswers(index)}
                </ul>
            </div>
        `
    });

    questions.innerHTML = content;

};

const renderIndicator = (currentStep) => {
    indicator.innerHTML = `${currentStep}/${DATA.length}`
};

quiz.addEventListener('change', (event) => {
    if (event.target.classList.contains('answer-input')) {
        ansResults[event.target.name] = event.target.value;
        btnNext.disabled = false;
    }
});

quiz.addEventListener('click', (event) => {

    if (event.target.classList.contains('btn-next')) {

        const nextQustionsIndex = Number(questions.dataset.currentStep) + 1;

        if (DATA.length === nextQustionsIndex) {
            questions.classList.add('questions--hidden');
            indicator.classList.add('indicator--hidden');
            results.classList.add('results--visible');
            btnNext.classList.add('btnNext--hidden');
            btnRestart.classList.add('btnRestart--visible');

            renderResults();
        }
        else {
            renderQuestions(nextQustionsIndex)
        }
        btnNext.disabled = true;
    }

    if (event.target.classList.contains('btn-restart')) {
        results.innerHTML = '';
        ansResults = {};

        questions.classList.remove('questions--hidden');
        indicator.classList.remove('indicator--hidden');
        results.classList.remove('results--visible');
        btnNext.classList.remove('btnNext--hidden');
        btnRestart.classList.remove('btnRestart--visible');

        renderQuestions(0);
    }
});

renderQuestions(0);