class Question {
    constructor(id, question, choices, answer) {
        this.id = id;
        this.question = question;
        this.choices = choices;
        this.answer = answer;
    }
}

const question1 = new Question(1, 'What is 2 + 2 ?', ['1', '2', '3', '4'], '4');
const question2 = new Question(1, 'How many hands humas have?', ['11', '2', '25', '4'], '2');
const question3 = new Question(1, 'What color is the sky?', ['Red', 'Yellow', 'Blue', 'Orange'], 'Blue');

const questions = [question1, question2, question3];

console.log(question1);
console.log(question2);
console.log(question3);

document.getElementById('start').addEventListener('click', startGame);

function startGame() {
    renderQuestion(questions, 0);
    let count = 1;
    let timer = setInterval(function() {
        // countdown();
        renderQuestion(questions, count);
        count++;
        if (count === questions.length) {
            clearInterval(timer);
        }

    }, 1000);
    alert('gameover');
    
    // renderQuestion(questions[2]);
}


function countdown() {
    let count1 = 10;
    let myTimer = setInterval(function() {
        document.getElementById('countdown').innerHTML = count1;
        if (count1 == 0) {
            clearInterval(myTimer);
        }
        count1--;
    }, 1000);

    return count1;
}

function renderQuestion(questions, count) {
        document.getElementById('answers').innerHTML = ``;
        document.getElementById('question').innerHTML = `<h2>${questions[count].question}</h2>`;
        for (index in questions[count].choices) {
            document.getElementById('answers').innerHTML += `<button class="answer id="answer-${index}">${questions[count].choices[index]}</button>`;
        }
    
}
    







