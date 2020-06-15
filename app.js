
//DATA CONTROLLER
const dataController = (()=> {

    /* Question class
        @param: question ID: number
                Question: string
                Possible answers: array string
                answer: string
    */

    class Question {
        constructor(id, question, choices, answer, answered = false) {
            this.id = id;
            this.question = question;
            this.choices = choices;
            this.answer = answer;
            this.answered = answered;
        }
    }
    

    //Create questions

    const question1 = new Question(1, 'What is 2 + 2 ?', ['1', '2', '3', '4'], '4');
    const question2 = new Question(2, 'How many hands humas have?', ['11', '2', '25', '4'], '2');
    const question3 = new Question(3, 'What color is the sky?', ['Red', 'Yellow', 'Blue', 'Orange'], 'Blue');
    
    //Game questions + score;

    const game = {
        score: 0,
        questions: [question1, question2, question3],
    }

    return {
        // check if answer is correct
        isCorrect: (choice, answer) => console.log(choice === answer),
        
        // Score methods

        getScore: () => game.score,
        
        addScore: ()=> game.score++,

        getGame: () => game,

    }

})();


// UI CONTROLLER

const UIController = (()=> {


    //DOM strings to share

    const DOMstrings = {
        btnStart: 'start',
        btnNext: 'next',
        gameBox: 'game-box',
        question: 'question',
        choices: 'answers',
        answer: 'answer',
        hide: 'hide',
        scoreboard: 'scoreboard',
        score: 'score',
        countdown: 'countdown',
        correct: 'correct',
        wrong: 'wrong',
        final: 'final',

    }

    return {
        
         getDOMstrings: () => DOMstrings,

        //  setGame: (gameBox, game) => {
        //     gameBox.innerHTML = `<div class="scoreboard">
        //                             <div class="countdown" id="countdown"></div>
        //                             <div class="score">${game.score}/${game.questions.length}</div>
        //                         </div>
        //                         <div class="question" id="question">
        //                         now let's see
        //                         </div>
        //                         <div class="answers" id="answers">
        //                                 <!-- <button class="answer">Answer 1</button>
        //                                 <button class="answer">Answer 2</button>
        //                                 <button class="answer">Answer 3</button>
        //                                 <button class="answer">Answer 4</button> -->
        //                         </div>
        //                         <button class="control next hide" id="next">Next</button>`

        //  },

        setScore: (score, game) => {
            score.innerHTML = `${game.score}/${game.questions.length}`

         },

         renderQuestion: (questionHTML, choicesHTML , question) => {
            questionHTML.innerHTML = `<h2>${question.question}</h2>`;
            for (choice in question.choices) {
                choicesHTML.innerHTML += `<button class="answer" id="answer-${choice}">${question.choices[choice]}</button>`;
            }

         },

         clearGameBox: (questionHTML, choicesHTML) => {
             questionHTML.innerHTML = '';
             choicesHTML.innerHTML = '';
         },



    }


})();

//APP CONTROLLER

const controller = ((dataCtrl, UIctrl)=> {

    const DOM = UIctrl.getDOMstrings(),
          game = dataCtrl.getGame(),
          gameBox = document.getElementById(DOM.gameBox),
          btnStart = document.getElementById(DOM.btnStart),
          score = document.getElementById(DOM.score),
          question = document.getElementById(DOM.question),
          choices = document.getElementById(DOM.choices),
          final = document.getElementById(DOM.final),
          btnNext = document.getElementById(DOM.btnNext);
          
    let answersCount = 0;

    const startGame = () => {
        //Start game
        btnStart.addEventListener('click', renderGame);
        choices.addEventListener('click', checkAnswer);
        btnNext.addEventListener('click', nextQuestion);

    }

    //
    const renderGame = () => {
        btnStart.classList.add(DOM.hide);
        gameBox.classList.remove(DOM.hide);
        UIctrl.setScore(score, game);
        displayQuestion();
    }


    const displayQuestion = () => {
       UIctrl.renderQuestion(question, choices, game.questions[answersCount]);
       removeNextButton();
    }

    const checkAnswer = (e) => {
        let userAnswer = e.target;
        let currentQuestion = game.questions[answersCount];
        if (!currentQuestion.answered) {
            if (userAnswer.textContent === currentQuestion.answer) {
                userAnswer.classList.add(DOM.correct);
                dataCtrl.addScore();
                UIctrl.setScore(score, game);
                currentQuestion.answered = true;
            } else {
                userAnswer.classList.add(DOM.wrong);
                currentQuestion.answered = true;
            }
        }
        nextButton();
    }
    const nextQuestion = () => {
        answersCount++;
        if (answersCount < game.questions.length) {
            UIctrl.clearGameBox(question, choices);
            displayQuestion();
        } else {
            UIctrl.clearGameBox(question, choices);
            removeNextButton();
            endGame();
        }
    }

    const resetQuestions = () => {
        for (item in game.questions) {
            game.questions[item].answered = false;
        }
    }

    const endGame = () => {
        final.classList.remove('hide');
        let span = document.createElement('span');
        span.innerHTML = 'Your Score is: ';
        span.className = 'before-score';
        score.parentNode.insertBefore(span, score);
        // btnStart.classList.remove('hide');
    }

    const nextButton = () => {
        btnNext.classList.remove(DOM.hide);
    }
    const removeNextButton = () => {
        btnNext.classList.add(DOM.hide);
    }  


    return {
        init: function() {
           startGame();
        }
    }

})(dataController, UIController);

controller.init();

