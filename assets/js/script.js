var startbuttonEl = document.querySelector(".startbutton");
var headerEl = document.querySelector("#header");
var directionsEl = document.querySelector("#directions");
var timerEl = document.querySelector("#timer");
var choicesEl = document.querySelector("#choices");
var main = document.querySelector("main");
var feedback = document.querySelector("#feedback");
var userScore = document.querySelector("#userScore");
var timeLeft = 60;
var playGame = false;



var Questions = ["Commonly used data types DO NOT include:", "String values must be enclosed within _____ when being assigned to variables."];
var Answers = ["3. alerts", "3. quotes"];
var Choices = ["1. strings", "2. booleans", "3. alerts", "4. numbers","1. commas", "2. curly brackets", "3. quotes", "4. parentheses"];
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
    playGame=true;

});

//Set up quiz timer
function timer(){
    var timerInterval = setInterval(function() {
    timeLeft--;
    timerEl.textContent = "Timer: " + timeLeft;

    if(timeLeft === 0 || timeLeft<0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      endQuiz();

      return;
    }
    else if(!playGame){
      clearInterval(timerInterval);

    }

  }, 1000);
    
}

//Display questions and choices
function renderQuiz(){

    headerEl.textContent=Questions[questionNumber];


    for(i=0; i<4; i++){
        var answerChoice = Choices[choiceNumber];

        var li = document.createElement("li");
        var button = document.createElement("button");
        button.textContent = answerChoice;
        button.setAttribute("class","answer");
    
        li.appendChild(button);
       choicesEl.appendChild(li);
       choiceNumber++;
    }

}

//Check quiz question answer
choicesEl.addEventListener("click", function(event){
var selection = event.target.innerText;
console.log(typeof Answers[questionNumber]);
if(selection === Answers[questionNumber]){
  correctAnswers++;
  feedback.setAttribute("style","border-top: 2px solid rgb(165, 159, 159);");
  feedback.textContent="Correct!";

}
else{
  feedback.setAttribute("style","border-top: 2px solid rgb(165, 159, 159);");
  feedback.textContent="Wrong!";
  timeLeft = timeLeft - 10;
}
questionNumber++;
if(questionNumber<Questions.length){
  event.target.blur();
  nextQuestion();

}
else{
  playGame=false;
  endQuiz();
}

});

//Next question displayed
function nextQuestion(){
  headerEl.textContent=Questions[questionNumber];


  for(i=0; i<4; i++){
      var answerChoice = Choices[choiceNumber];
    choicesEl.children[i].children[0].textContent=answerChoice;

     choiceNumber++;
  }
}

//Ends the quiz
function endQuiz(){
  headerEl.textContent="Quiz Completed.";
  directionsEl.textContent="Your final score is " + timeLeft;

  for(i=0; i<4; i++){
    choicesEl.children[0].remove();
}
feedback.setAttribute("style","border-top: 2px solid white;");
feedback.textContent="";
var initials = document.createElement("input");
initials.setAttribute("type", "text");
initials.setAttribute("name", "initials");

var label = document.createElement("p");
//label.setAttribute("for", "initials");
label.textContent("Enter initials:");

//label.appendChild(initials);
userScore.appendChild(label);

}