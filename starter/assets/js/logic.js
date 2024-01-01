// all const for html elements
const timeEl = document.querySelector('#time');
const startScreenDiv = document.querySelector('#start-screen');
const startBtn = document.querySelector('#start');
const questionsDiv = document.querySelector('#questions');
const questionTitleEl = document.querySelector('#question-title');
const choicesDiv = document.querySelector('#choices');
const endScreenDiv = document.querySelector('#end-screen');
const finalScoreEl = document.querySelector('#final-score');
const initialsEl = document.querySelector('#initials');
const submitBtn = document.querySelector('#submit');
const feedbackEl = document.querySelector('#feedback');

let score = 0;
let currentQuestionIndex = 0;
let timeLeft = 75;

// after the 'Start Quiz' button is clicked, start the timer, hide the #Start-screen div and display the 1st question
startBtn.addEventListener('click', function() {
    countdown();
    showQuestions();
    askQuestion();
})

// timer function
function countdown() {
    const timeInterval = setInterval(function() {
        if (timeLeft >= 0) {
            timeEl.textContent = timeLeft;
            timeLeft--;
        } else {
            timeEl.textContent = 0;
            clearInterval(timeInterval);
        };
    }, 1000);
}

// function to hide start div, show questions div
function showQuestions() {
    startScreenDiv.classList.add("hide");
    questionsDiv.classList.toggle("hide");
}

// function to ask questions
function askQuestion() {
    // display question
    questionTitleEl.textContent = questions[currentQuestionIndex].question;
    
    // create div for list of answers
    const answersList = document.createElement('ol');
    choicesDiv.appendChild(answersList);

    // create answers array
    const answers = questions[currentQuestionIndex].answers;

    // create lis with answer options, add to the list
    answers.forEach(answer => {
        const optionLi = document.createElement('li'); // create html element in DOM for answer option

        optionLi.style.removeProperty('backgroundColor'); // <- NOT WORKING!!!!
  
        let answerText = document.createTextNode(answer.text); // add a node with answer's text
        let correctAnswer = answer.correct; // extract info about correctness of the answer
        optionLi.appendChild(answerText); // add text to the html element
        const optionBtn = document.createElement('button');
        optionBtn.classList.add("choices"); // add styling
        optionBtn.appendChild(optionLi);
        answersList.appendChild(optionBtn); // add answer option to the list of answers

        // const optionEl = document.createElement('button'); // create html element in DOM for answer option
        // optionEl.classList.add("choices"); // add styling
        // let answerText = document.createTextNode(answer.text); // add a node with answer's text
        // let correctAnswer = answer.correct; // extract info about correctness of the answer
        // optionEl.appendChild(answerText); // add text to the html element
        // answersList.appendChild(optionEl); // add answer option to the list of answers
        // when user clicks on answer option
        optionBtn.addEventListener('click', (event) => {
            // remove list of answers for previous questions
            choicesDiv.removeChild(answersList);
            // show feedback for 1 sec
            if(correctAnswer) {
                feedbackEl.textContent = "Correct!";
                score += 5;
            } else {
                feedbackEl.textContent = "Incorrect!";
                timeLeft -= 5;
            }
            feedbackEl.classList.toggle("hide");
            setTimeout(function() {
                feedbackEl.classList.toggle("hide");
            }, 1000);
            // ask the next question
            currentQuestionIndex++;
            askQuestion();                
        });
    });
    // when time runs out OR no more questions
    if (timeLeft <= 0 || currentQuestionIndex === questions.length - 1) {
        showEndScreen();
        addPlayer();
    };
};

// function to switch from questions to the end screen
function showEndScreen() {
    questionsDiv.classList.toggle("hide");
    endScreenDiv.classList.toggle("hide");
    finalScoreEl.textContent = score;
}

// function to add user's initials and store score in local storage
// function addPlayer() {
//     submitBtn.addEventListener('click', function(e){
//         const playerInitials = initialsEl.value;
//         const player = {initials: playerInitials, scoreValue: score};
//         const userInfo = JSON.stringify(player);
//         localStorage.setItem("user", userInfo);
//         window.location.href = "highscores.html";
//     });
// }

function addPlayer() {
    submitBtn.addEventListener('click', function(e){
        const playerInitials = initialsEl.value;
        const player = {initials: playerInitials, scoreValue: score};
        const userInfo = JSON.stringify(player);
        localStorage.setItem("user", userInfo);
        window.location.href = "highscores.html";
    });
}