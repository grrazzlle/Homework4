// render start page with view highscores in top left, timer at 0 in top right, coding quiz challenge header, explaination text underneath, and a stat quiz button under that

//once start button is pressed change header to question and text under to buttons with answers in them, also set timer to 100

//if a button is clicked check to see if it matches the correct answer and display if right or wrong, if wrong reduce time, if right add points, then go to next question

//after all questions answered or if timer reaches 0 replace header with all done! show score, allow user to input initials, and submit them to local storage, take user to high score page

//if clicked view highscore or after submit anitials replace header with highscores, show high score saved to loval storage if there is one, show buttons for home page and clear high score from local storage

var body = document.body;

var divE1 = document.createElement("div");
var listEl = document.createElement("ol");
var currentQuestion = 0

var questionObjects = [
    {question: "question 1?", answers: ["answer 1", "answer 2", "answer 3", "answer 4"], correctAnswer: "answer 1"},
    {question: "question 2?", answers: ["answer 5", "answer 6", "answer 7", "answer 8"], correctAnswer: "answer 6"},
    {question: "question 3?", answers: ["answer 9", "answer 10", "answer 11", "answer 12"], correctAnswer: "answer 11"},
    {question: "question 4?", answers: ["answer 13", "answer 14", "answer 15", "answer 16"], correctAnswer: "answer 16"},
    {question: "question 5?", answers: ["answer 17", "answer 18", "answer 19", "answer 20"], correctAnswer: "answer 17"}
];




body.appendChild(divE1);


function whichQuestion (){
    for (var i = 0; i < questionObjects[currentQuestion].answers.length; i++) {
        
        var answer = questionObjects[currentQuestion].answers[i];

        divE1.textContent = questionObjects[currentQuestion].question;
        var li = document.createElement("li");
        var button = document.createElement("button");
        button.textContent = answer;

        divE1.appendChild(listEl);
        li.appendChild(button);
        listEl.appendChild(li);
    }
}
// function removeAnswers (){
//     for (var i = 0; i < questionObjects[currentQuestion].answers.length; i++) {
        
        
//     }
// }
document.querySelector("div").addEventListener("click",function(event) {
    if(event.target.matches("button")) {
        var userAnswer = event.target.innerText;
    
    if (userAnswer == questionObjects[currentQuestion].correctAnswer) {
    console.log("add points to score")//will add later
    } else {
    console.log("remove time from timer")//will add later
    }
    console.log(currentQuestion)
    //removeAnswers ()
    currentQuestion++
    whichQuestion ()
    }
})
whichQuestion ()

