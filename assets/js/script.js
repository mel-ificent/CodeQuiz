var startbuttonEl = document.querySelector("#startButton");
var headerEl = document.querySelector("#header");
var directionsEl = document.querySelector("#directions");
var timerEl = document.querySelector("#timer");
var choicesEl = document.querySelector("#choices");
var main = document.querySelector("main");
var feedback = document.querySelector("#feedback");
var userScore = document.querySelector("#userScore");
var storedScores = document.querySelector("#storedScores");
var navButton = document.querySelector("#navButton");
var clearButton = document.querySelector("#clearButton");
var highscoresEl = document.querySelector("#highscores");

var timeLeft = 60;
var playGame = false;
var Questions = ["Commonly used data types DO NOT include:", "String values must be enclosed within _____ when being assigned to variables.","The condition in an if / else statement is enclosed within ____", "Arrays in JavaScript can be used to store _____.","A very useful tool used during development and debugging for printing content to the debugger is:"];
var Answers = ["3. alerts", "3. quotes", "3. parentheses","4. all of the above", "4. console.log"];
var Choices = ["1. strings", "2. booleans", "3. alerts", "4. numbers","1. commas", "2. curly brackets", "3. quotes", "4. parentheses","1. quotes", "2. curly brackets", "3. parentheses","4. square brackets", "1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above","1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"];
var finalScore = 0;
var questionNumber = 0;
var choiceNumber = 0;
var allScores = [];


//When the screen initially loads, get stored scores
function init(){
  var storedUserScores = JSON.parse(localStorage.getItem("Scores"));

  // If scores were retrieved from localStorage, update the scores array to it
  if (storedUserScores !== null) {
    allScores = storedUserScores;
  
  }

  else{
  allScores=[];

  }

}

//Use the start button to kick off the quiz.  This will clear the initial screen values (e.g. play button, directions) and start the timer and quiz rendering
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

    //this if statement checks to see if the clock runs out
    if(timeLeft === 0 || timeLeft<0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      timerEl.textContent = "";
      endQuiz();

      return;
    }

    //this if statement checks to see if the clock should stop because the quiz has been completed
    else if(!playGame){
      clearInterval(timerInterval);
      timerEl.textContent = "";

    }

  }, 1000);
    
}

//Display first question and choices
function renderQuiz(){

    headerEl.textContent=Questions[questionNumber];


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

//Check quiz question answer once the user clicks on an option
choicesEl.addEventListener("click", function(event){
event.stopPropagation();

var selection = event.target.innerText;

//display correct or incorrect message based on the user's choice
if(selection === Answers[questionNumber]){
  feedback.setAttribute("style","border-top: 2px solid rgb(165, 159, 159);");
  feedback.textContent="Correct!";

}
//if the user answer incorrectly the clock time is penalized by 10
else{
  feedback.setAttribute("style","border-top: 2px solid rgb(165, 159, 159);");
  feedback.textContent="Wrong!";
  timeLeft = timeLeft - 10;
}
questionNumber++;
//if statement to decide whether there is another question or if the game should end
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

//Ends the quiz, displays end of quiz information and removes choice options
function endQuiz(){
  finalScore = timeLeft;
  headerEl.textContent="Quiz Completed.";
  directionsEl.textContent="Your final score is " + finalScore;
  timerEl.textContent = "";

  for(i=0; i<4; i++){
    choicesEl.children[0].remove();
}

//Adds a form for the user to add their initials for the scores page
feedback.setAttribute("style","border-top: 2px solid white;");
feedback.textContent="";
var initials = document.createElement("input");
initials.setAttribute("type", "text");
initials.setAttribute("name", "initials");
initials.setAttribute("id", "initialsInput");

var submit = document.createElement("input");
submit.setAttribute("id","submit");
submit.setAttribute("class","button");
submit.setAttribute("type","submit");
submit.setAttribute("value","Submit");

var label = document.createElement("label");
label.setAttribute("for", "initials");
label.textContent="Enter initials: ";

userScore.appendChild(label);
userScore.appendChild(initials);
userScore.appendChild(submit);

}

//Stores user score when the user clicks submit on the form
userScore.addEventListener("click", function(event){
event.preventDefault();

feedback.setAttribute("style","border-top: 2px solid white;");
feedback.textContent="";

var sendScore = event.target;

// Checks if element is the submit button
//Adds an error message if the user does not enter their initials
if(sendScore.getAttribute("value")==="Submit" && document.querySelector("#initialsInput").value===""){
  feedback.setAttribute("style","border-top: 2px solid rgb(165, 159, 159);");
  feedback.textContent="Enter your initials before proceeding.";


}

//if the user submits their initials, it gets concatenated with the score and stored in the allScores array which is added to local storage
else if(sendScore.getAttribute("value")==="Submit"){
  
  var initialInput = document.querySelector("#initialsInput");
  var userInitialsScore = initialInput.value.trim() + " - " + finalScore;
  allScores.push(userInitialsScore);
  localStorage.setItem("Scores", JSON.stringify(allScores));
  renderScores();
}

});




  //removes unnecessary fields (e.g. initials form, choices, buttons, etc) 
  

function renderScores(){
  if(userScore.children[0]!==undefined){
  userScore.children[0].remove();
  userScore.children[0].remove();
  userScore.children[0].remove();
  }
  headerEl.textContent="Highscores";
  directionsEl.textContent="";
  timerEl.textContent = "";
  main.setAttribute("class", "playcontainer");
  startbuttonEl.setAttribute("hidden", true);
  highscoresEl.textContent="";
  playGame=false;

if(choicesEl.children[0]!==undefined){
  for(i=0; i<4; i++){
    choicesEl.children[0].remove();
  }
}
  
//also adds the 'go back' and 'clear scores' buttons if needed
  if(document.querySelector("#goBack")=== null){
  var goBack = document.createElement("button");
  goBack.textContent = "Go Back";
  goBack.setAttribute("id","goBack");
  goBack.setAttribute("class","button");

  var clearScores = document.createElement("button");
  clearScores.textContent = "Clear Scores";
  clearScores.setAttribute("id","clearScores");
  clearScores.setAttribute("class","button");

 navButton.appendChild(goBack);
 clearButton.appendChild(clearScores);
}
//then prints each user and score saved in the local storage
for (var i = 0; i < allScores.length; i++) {
  var printScore = allScores[i];

  var li = document.createElement("li");
  li.textContent = printScore;
  storedScores.appendChild(li);
}


}

//Event listener for if the user clicks the 'Clear Scores" button
clearButton.addEventListener("click", function(event){
  var element = event.target;

  // Checks if the clicked element is a button, if so then the scores array, values on the screen, and local storage is all cleared
  if (element.matches("button") === true) {

    for (var i = 0; i < allScores.length; i++) {
    
      storedScores.children[0].remove();
    }
      
  localStorage.clear();
  allScores = [];

  renderScores();
  }

});

//Event listener for to go back to the starting page
navButton.addEventListener("click", function(event){
  var element = event.target;

  // Checks if element clicked is a button, if so the page will be reloaded which will bring the user back to the start
  if (element.matches("button") === true) {

   location.reload();
  }

});

//Render scores if the user clicks the 'View Highscores' at the top of the page at any time
highscoresEl.addEventListener("click", function(){

renderScores();

});

init();