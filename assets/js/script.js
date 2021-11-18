var startbuttonEl = document.querySelector(".startbutton");
var headerEl = document.querySelector("#header");
var directionsEl = document.querySelector("#directions");
var timerEl = document.querySelector("#timer");
var choicesEl = document.querySelector("#choices");
var main = document.querySelector("main");
var timeLeft = 60;


var Questions = ["Commonly used data types DO NOT include:"];
var Answers = ["3. alerts"];
var Choices = ["1. strings", "2. booleans", "3. alerts", "4. numbers"];
correctAnswers=0;
var questionNumber = 0;
var choiceNumber = 0;

//Use the start button to kick off the quiz
startbuttonEl.addEventListener("click", function(){

    directionsEl.textContent="";
    timerEl.textContent = "Timer: " + timeLeft;
    startbuttonEl.setAttribute("hidden", true);
    main.setAttribute("class", "playcontainer");
    timer();
    renderQuiz();

});

//Set up quiz timer
function timer(){
    var timerInterval = setInterval(function() {
    timeLeft--;
    timerEl.textContent = "Timer: " + timeLeft;

    if(timeLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // Placeholder for when the clock runs out
      return;
    }

  }, 1000);
    
}

//Display questions and choices
function renderQuiz(){

    headerEl.textContent=Questions[questionNumber];
    questionNumber++;

    for(i=0; i<4; i++){
        var answerChoice = Choices[choiceNumber];

        var li = document.createElement("li");
        var button = document.createElement("button");
        button.textContent = answerChoice;
        button.setAttribute("class","button");
    
        li.appendChild(button);
       choicesEl.appendChild(li);
       choiceNumber++;
    }



}