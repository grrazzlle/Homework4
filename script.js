var body = document.body;

var viewHighScore = document.createElement('span');
var viewHighScoreLink = document.createElement('a')

var timer = document.createElement('span');
timer.style.float = 'right'
var timeLeft = 75;
var timeInterval

var currentScore = '';

var initialsText = document.createElement('span');
initialsText.style.marginLeft = '40%'//only way to move this
var userInitials = document.createElement('input')
var submitButton = document.createElement('button');

var highScoreSpan = document.createElement('span')
highScoreSpan.style.marginLeft = '44%'//only way to move this
var goBackButton = document.createElement('button')
var clearHighScoreButton = document.createElement('button')

var h1Text = document.createElement('h1');
h1Text.style.textAlign = 'center'
var underText = document.createElement('div');
underText.style.textAlign = 'center'
var startButton = document.createElement('button');
startButton.style.width = '200px'
startButton.style.marginLeft = '45%'//only way to move this
var listEl = document.createElement('ol');
listEl.style.listStyleType = 'none'
listEl.style.marginLeft = '45%'//only way to move this
var currentQuestion = 0;

var questionObjects = [
    { question: 'Commonly used data types DO NOT include:', answers: ['1. strings', '2. booleans', '3. alerts', '4. numbers'], correctAnswer: '3. alerts' },
    { question: 'The condition in an if / else statement is enclosed within ___.', answers: ['1. quotes', '2. curly brackets', '3. parentheses', '4. square brackets'], correctAnswer: '2. curly brackets' },
    { question: 'Arrays in JavaScript can be used to store ___.', answers: ['1. numbers and strings', '2. other arrays', '3. booleans', '4. all of the above'], correctAnswer: '4. all of the above' },
    { question: 'String values must be enclosed within ___ when being assigned to variables.', answers: ['1. commas', '2. curly brackets', '3. quotes', '4. parentheses'], correctAnswer: '3. quotes' },
    { question: 'A very useful tool used during development and debugging for printing content to the debugger is:', answers: ['1. JavaScript', '2. terminal / bash', '3. for loops', '4. console.log'], correctAnswer: '2. terminal / bash' }
];

// localStorage.setItem('userInitials', '');
// localStorage.setItem('currentScore', '');

body.appendChild(viewHighScore)
viewHighScore.appendChild(viewHighScoreLink)
viewHighScoreLink.textContent = 'View HighScore'
viewHighScoreLink.setAttribute('href', '#')

timer.setAttribute('id', 'timerId')
body.appendChild(timer)
document.querySelector('#timerId').innerHTML = '0';

body.appendChild(h1Text);
body.appendChild(listEl);

function startPage() {
    currentQuestion = 0;
    h1Text.textContent = 'Coding Quiz Challenge';
    underText.textContent = 'Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your scoretime by ten seconds!';
    startButton.textContent = 'Start Quiz'
    startButton.setAttribute('id', 'startButton')

    body.appendChild(underText);
    body.appendChild(startButton);
    underText.style.display = ''
    startButton.style.display = ''
    viewHighScore.style.display = ''
    timer.style.display = ''

}

startButton.addEventListener('click', function (event) {

    timerFunction()

    underText.style.display = 'none'
    startButton.style.display = 'none'
    whichQuestion()
})

function whichQuestion() {
    document.querySelector('ol').innerHTML = '';
    for (var i = 0; i < questionObjects[currentQuestion].answers.length; i++) {

        var answer = questionObjects[currentQuestion].answers[i];

        h1Text.textContent = questionObjects[currentQuestion].question;
        var li = document.createElement('li');
        var button = document.createElement('button');
        button.textContent = answer;

        li.appendChild(button);
        listEl.appendChild(li);
    }
}

function SubmitHighscorePage() {
    document.querySelector('ol').innerHTML = '';
    h1Text.textContent = 'All done!';
    underText.style.display = ''
    underText.textContent = 'Your score is ' + currentScore + '.'
    if (currentScore >= localStorage.getItem('currentScore')) {
        body.appendChild(initialsText)
        initialsText.style.display = ''
        initialsText.textContent = 'Enter initials:'
        initialsText.appendChild(userInitials)

        userInitials.value = ''
        initialsText.appendChild(submitButton)
        submitButton.textContent = 'Submit'
        submitButton.setAttribute('id', 'submitButton')
        document.querySelector('#submitButton').addEventListener('click', function (event) {
            if (event.target.matches('button')) {

                localStorage.setItem('userInitials', userInitials.value);
                localStorage.setItem('currentScore', currentScore);
            }

            viewHighscorePage()

        })
    } else {

        highScoreSpan.style.display = ''
        clearHighScoreButton.style.display = 'none'
    }
}

function viewHighscorePage() {
    clearInterval(timeInterval);
    timer.textContent = 0
    document.querySelector('ol').innerHTML = '';
    startButton.style.display = 'none'
    viewHighScore.style.display = 'none'
    timer.style.display = 'none'
    h1Text.textContent = 'HighScore';
    underText.style.display = ''
    underText.textContent = ''
    if (localStorage.getItem('userInitials')) {
        underText.textContent = localStorage.getItem('userInitials') + ' ' + localStorage.getItem('currentScore')
    }


    initialsText.style.display = 'none'
    body.appendChild(highScoreSpan)
    highScoreSpan.style.display = ''

    highScoreSpan.appendChild(goBackButton)
    goBackButton.textContent = 'Go Back'
    goBackButton.setAttribute('id', 'goBack')
    highScoreSpan.appendChild(clearHighScoreButton)
    clearHighScoreButton.textContent = 'Clear HighScore'
    clearHighScoreButton.setAttribute('id', 'clearHighScore')

    document.querySelector('#goBack').addEventListener('click', function (event) {
        if (event.target.matches('button')) {
            highScoreSpan.style.display = 'none'
            startPage()
        }
    })

    document.querySelector('#clearHighScore').addEventListener('click', function (event) {
        if (event.target.matches('button')) {
            underText.textContent = ''
            localStorage.setItem('userInitials', '');
            localStorage.setItem('currentScore', '');
        }
    })
}

document.querySelector('a').addEventListener('click', function (event) {
    viewHighscorePage()
})

document.querySelector('ol').addEventListener('click', function (event) {
    if (event.target.matches('button')) {
        var userAnswer = event.target.innerText;

        if (currentQuestion > questionObjects[currentQuestion].answers.length - 1) {
            clearInterval(timeInterval);

            timeLeft = 0
            timer.textContent = timeLeft
            SubmitHighscorePage()


        } else {
            if (userAnswer != questionObjects[currentQuestion].correctAnswer) {
                timeLeft -= 10
            }
            currentScore = timeLeft
            currentQuestion++
            whichQuestion()
        }
    }
})

function timerFunction() {
    timeLeft = 75
    timeInterval = setInterval(function () {
        timer.textContent = timeLeft;
        timeLeft--;

        if (timeLeft <= 0) {
            currentScore = 0
            timer.textContent = 0
            clearInterval(timeInterval);
            SubmitHighscorePage()
        }
    }, 1000);
}



startPage()

