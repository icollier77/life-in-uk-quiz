// all const for html elements
const timeEl = document.querySelector('#time');
const startScreenEl = document.querySelector('#start-screen');
const startBtn = document.querySelector('#start');
const questionsEl = document.querySelector('#questions');
const questionTitleEl = document.querySelector('#question-title');
const choicesEl = document.querySelector('#choices');
const endScreenEl = document.querySelector('#end-screen');
const finalScoreEl = document.querySelector('#final-score');
const initialsEl = document.querySelector('#initials');
const submitBtn = document.querySelector('#submit');
const feedbackEl = document.querySelector('#feedback');


// set score to 0
let score = 0;

// after the 'Start Quiz' button is clicked, set the timer to 75 seconds and start counting down
startBtn.addEventListener('click', function() {
    countdown();
    console.log(timeLeft);
})

function countdown() {
    let timeLeft = 75;
    const timeInterval = setInterval(function () {
    if (timeLeft >= 0) {
        timeEl.textContent = timeLeft;
        timeLeft--;
    } else {
        timeEl.textContent = 0;
        clearInterval(timeInterval);
        // Call the `displayMessage()` function
        // displayMessage();
    }
    }, 1000);
}

// when timer = 0, switch to the 


// when Start button is clicked, hide the #Start-screen div and display the 1st question


// apply the question to #question-title and the answers to #choices



// when user answers correctly, show the Feedback div with 'Correct!' for a few seconds, add 20 to score
// when user answer incorrectly, show Feedback with 'Incorrect!' for a few seconds, subtract 10 sec from timer, subtract 10 from score



// after the feedback timer finishes, switch to the next question




// after a question is answered correctly, add 5 points; incorrectly - 0 points


// after all Qs are answered OR timer = 0, show 'End-screen' div to display final score and enter Initials, save Initials and score to local storage as JSON

// when user clicks 'Submit' function in the 'end-screen', open the highscores.html
