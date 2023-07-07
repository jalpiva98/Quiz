var startContainer = document.getElementById("start-container");
var startButton = document.getElementById("start-btn");
var quizContainer = document.getElementById("quiz-container");
var questionElement = document.getElementById("question");
var choicesElement = document.getElementById("choices");
var feedbackElement = document.getElementById("feedback");
var timeElement = document.getElementById("time");

var leaderboardContainer = document.getElementById("leaderboard-container");
var leaderboardList = document.getElementById("leaderboard-list");
var goBackButton = document.getElementById("go-back-btn");

//questions array

var questions = [
    {
      question: "What is the output of the following code?\n\nconsole.log(typeof null);",
      choices: ["object", "null", "undefined", "string"],
      correctAnswer: 0
    },
    {
      question: "Which method is used to add one or more elements to the end of an array and returns the new length of the array?",
      choices: ["pop()", "push()", "concat()", "slice()"],
      correctAnswer: 1
    },
    {
      question: "Which keyword is used to declare a variable in JavaScript?",
      choices: ["var", "let", "const", "both let and const"],
      correctAnswer: 3
    },
    {
      question: "What will the following code output?\n\nconsole.log(2 + '2');",
      choices: ["4", "22", "TypeError", "undefined"],
      correctAnswer: 1
    },
    {
      question: "Which built-in method removes the last element from an array and returns that element?",
      choices: ["pop()", "shift()", "unshift()", "push()"],
      correctAnswer: 0
    },
    {
      question: "What does the 'this' keyword refer to in JavaScript?",
      choices: ["The current function", "The global object", "The parent object", "The HTML document"],
      correctAnswer: 2
    },
    {
      question: "Which operator is used to compare the equality of two values without considering their types?",
      choices: ["==", "===", "=>", "!="],
      correctAnswer: 0
    },
    {
      question: "What is the correct syntax to select an element with the ID 'myElement' using JavaScript?",
      choices: ["getElementById('myElement')", "querySelector('#myElement')", "$('#myElement')", ".getElementById('myElement')"],
      correctAnswer: 0
    },
    {
      question: "Which of the following is NOT a JavaScript data type?",
      choices: ["String", "Number", "Boolean", "Float"],
      correctAnswer: 3
    },
    {
      question: "What does the following code snippet do?\n\nsetTimeout(myFunction, 3000);",
      choices: ["Calls myFunction every 3 seconds", "Waits for 3 seconds and then calls myFunction", "Calls myFunction after 3 milliseconds", "Throws an error"],
      correctAnswer: 1
    }
]

var score = 0;
var answeredQuestions = 0; // Track the number of answered questions
var time = 60;
var timerInterval;
var currentQuestion; // Declare currentQuestion outside functions

function startQuiz() {
  startContainer.style.display = "none";
  quizContainer.style.display = "block";
  timeElement.style.display= "block";
  startTimer();
  currentQuestion = getRandomQuestion(); // Get random question
  displayQuestion(currentQuestion);
}

function getRandomQuestion() {
  var randomIndex = Math.floor(Math.random() * questions.length);
  var randomQuestion = questions[randomIndex];
  questions.splice(randomIndex, 1); // Remove the selected question from the array
  return randomQuestion;
}

function displayQuestion(question) {
  questionElement.textContent = question.question;

  choicesElement.innerHTML = "";
  question.choices.forEach(function (choice, index) {
    var li = document.createElement("li");
    li.textContent = choice;
    li.classList.add("choice");
    li.addEventListener("click", function () {
      handleAnswer(index, question.correctAnswer);
    });
    choicesElement.appendChild(li);
  });
}

function handleAnswer(choiceIndex, correctAnswerIndex) {
  answeredQuestions++; // Increment the number of answered questions

  if (choiceIndex === correctAnswerIndex) {
    score++;
    feedbackElement.textContent = "Correct!";
    feedbackElement.style.color = "green";
  } else {
    feedbackElement.textContent = "Incorrect!";
    feedbackElement.style.color = "red";
    time -= 5; // Decrease time by 5 seconds for each incorrect answer
    if (time < 0) {
      time = 0; // Ensure the time doesn't go negative
    }
  }

  setTimeout(function () {
    currentQuestion = getRandomQuestion(); // Get new random question
    if (currentQuestion) {
      displayQuestion(currentQuestion);
      feedbackElement.textContent = "";
      feedbackElement.style.color = "";
    } else {
      endQuiz();
    }
  }, 1000); // Delay the display of the next question for 1 second
}



function endQuiz() {
  clearInterval(timerInterval);
  var message = "Quiz completed! Your score: " + score 
  questionElement.textContent = message;
  choicesElement.style.display = "none";
  feedbackElement.style.display = "none";
  timeElement.style.display= "none";

  // Show the initials form
  initialsContainer.style.display = "block";
}

function startTimer() {
  updateTimerDisplay();

  timerInterval = setInterval(function () {
    time--;
    updateTimerDisplay();

    if (time <= 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}

var initialsContainer = document.getElementById("initials-container");
var initialsForm = document.getElementById("initials-form");
var initialsInput = document.getElementById("initials");
var leaderboardContainer = document.getElementById("leaderboard-container");
var leaderboardList = document.getElementById("leaderboard-list");
var goBackButton = document.getElementById("go-back-btn");

// Leaderboard data array to store initials and scores
var leaderboardData = [];

// Handle form submission
initialsForm.addEventListener("submit", function (event) {
  event.preventDefault();
  var initials = initialsInput.value.trim();
  if (initials !== "") {
    // Add initials and score to leaderboard data
    leaderboardData.push({ initials: initials, score: score });

    // Sort leaderboard data by score in descending order
    leaderboardData.sort(function (a, b) {
      return b.score - a.score;
    });

    // Display leaderboard
    displayLeaderboard();

    // Hide the initials form
    initialsContainer.style.display = "none";
  }
});

// Handle go back button click
goBackButton.addEventListener("click", function () {
  // Reset quiz
  resetQuiz();

  // Show start container
  startContainer.style.display = "block";

  // Hide leaderboard container
  leaderboardContainer.style.display = "none";
});

// Function to display leaderboard
function displayLeaderboard() {
  leaderboardList.innerHTML = "";

  leaderboardData.forEach(function (item) {
    var li = document.createElement("li");
    li.textContent = item.initials + ": " + item.score;
    leaderboardList.appendChild(li);
  });
  localStorage.setItem("leaderboardData", JSON.stringify(leaderboardData));
  // Show leaderboard container
  leaderboardContainer.style.display = "block";
}

// Function to reset the quiz
function resetQuiz() {

 // Retrieve leaderboard data from local storage
 var savedLeaderboardData = localStorage.getItem("leaderboardData");
 leaderboardData = savedLeaderboardData ? JSON.parse(savedLeaderboardData) : [];

 // Reset variables
 score = 0;
 answeredQuestions = 0;
 time = 60;
 timerInterval = null;
 currentQuestion = null;

 // Reset display
 questionElement.textContent = "";
 choicesElement.innerHTML = "";
 feedbackElement.textContent = "";
 choicesElement.style.display = "block";
 feedbackElement.style.display = "block";
 initialsContainer.style.display = "none";
 leaderboardContainer.style.display = "none";


  // Reset questions array
  questions = [
    {
        question: "What is the output of the following code?\n\nconsole.log(typeof null);",
        choices: ["object", "null", "undefined", "string"],
        correctAnswer: 0
      },
      {
        question: "Which method is used to add one or more elements to the end of an array and returns the new length of the array?",
        choices: ["pop()", "push()", "concat()", "slice()"],
        correctAnswer: 1
      },
      {
        question: "Which keyword is used to declare a variable in JavaScript?",
        choices: ["var", "let", "const", "both let and const"],
        correctAnswer: 3
      },
      {
        question: "What will the following code output?\n\nconsole.log(2 + '2');",
        choices: ["4", "22", "TypeError", "undefined"],
        correctAnswer: 1
      },
      {
        question: "Which built-in method removes the last element from an array and returns that element?",
        choices: ["pop()", "shift()", "unshift()", "push()"],
        correctAnswer: 0
      },
      {
        question: "What does the 'this' keyword refer to in JavaScript?",
        choices: ["The current function", "The global object", "The parent object", "The HTML document"],
        correctAnswer: 2
      },
      {
        question: "Which operator is used to compare the equality of two values without considering their types?",
        choices: ["==", "===", "=>", "!="],
        correctAnswer: 0
      },
      {
        question: "What is the correct syntax to select an element with the ID 'myElement' using JavaScript?",
        choices: ["getElementById('myElement')", "querySelector('#myElement')", "$('#myElement')", ".getElementById('myElement')"],
        correctAnswer: 0
      },
      {
        question: "Which of the following is NOT a JavaScript data type?",
        choices: ["String", "Number", "Boolean", "Float"],
        correctAnswer: 3
      },
      {
        question: "What does the following code snippet do?\n\nsetTimeout(myFunction, 3000);",
        choices: ["Calls myFunction every 3 seconds", "Waits for 3 seconds and then calls myFunction", "Calls myFunction after 3 milliseconds", "Throws an error"],
        correctAnswer: 1
      }
  ];
}

// Event listener for start button click
startButton.addEventListener("click", function () {
  startQuiz();
});

// Update timer display
function updateTimerDisplay() {
  timeElement.textContent = time;
  if (time <= 10) {
    timeElement.style.color = "red";
  } else {
    timeElement.style.color = "black";
  }
}
