const startButton = document.getElementById('start-btn');
const questionContainer = document.getElementById('question-container');
const timerDisplay = document.getElementById('time-left');
const endScreen = document.getElementById('end-screen');
const initialsInput = document.getElementById('initials');
const submitForm = document.getElementById('submit-form');

const questions = [
  { q: 'What is JavaScript?', a: ['A programming language', 'A type of coffee', 'A type of bread'], c: 0 },
  { q: 'What symbol is used for single-line comments in JavaScript?', a: ['//', '/*', '--'], c: 0 }
];

let questionIndex = 0;
let timeLeft = 60;
let timerInterval;

startButton.addEventListener('click', startQuiz);
submitForm.addEventListener('submit', saveScore);

function startQuiz() {
  startButton.classList.add('hidden');
  renderQuestion();
  startTimer();
}

function renderQuestion() {
  const question = questions[questionIndex];
  questionContainer.innerHTML = `
    <h2>${question.q}</h2>
    <ul>
      ${question.a.map((answer, index) => `<li><button onclick="checkAnswer(${index})">${answer}</button></li>`).join('')}
    </ul>
  `;
}

function checkAnswer(selectedIndex) {
  const question = questions[questionIndex];
  if (selectedIndex === question.c) {
    questionIndex++;
    if (questionIndex < questions.length) {
      renderQuestion();
    } else {
      endQuiz();
    }
  } else {
    timeLeft -= 10; // Subtract 10 seconds for wrong answer
  }
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}

function endQuiz() {
  clearInterval(timerInterval);
  questionContainer.innerHTML = '';
  endScreen.classList.remove('hidden');
}

function saveScore(event) {
  event.preventDefault();
  const initials = initialsInput.value.trim();
  // Save score here, e.g., send it to server or store in localStorage
  alert(`Score saved for initials: ${initials}`);
}
