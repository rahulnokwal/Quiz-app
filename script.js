const startBtn = document.querySelector("#start-btn");
const nextBtn = document.querySelector("#next-question-btn");
const restartBtn = document.querySelector("#restart-btn");
const endQuiz = document.querySelector("#end-quiz");
const questionContainer = document.querySelector(
  "[data-id='question-container']",
);
const scoreContainer = document.querySelector("[data-id='score']");
const questions = document.querySelector("[data-id='question']");
const optionContainer = document.querySelector("[data-id='options']");
const score = document.querySelector("[data-id='score-value']");
const progressBar = document.querySelector("[data-id='progress-bar']");
const progressBarVisuals = document.querySelector(
  "[data-id='progress-bar-visual']",
);
const endTimer = document.querySelector("[data-id='end-timer']");
const techQuiz = [
  {
    question:
      "Which programming language is known as the 'language of the web'?",
    choices: ["Python", "C++", "JavaScript", "Java"],
    answer: "JavaScript",
  },
  {
    question: "What does HTML stand for?",
    choices: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Hyper Transfer Markup Level",
      "Home Tool Markup Language",
    ],
    answer: "Hyper Text Markup Language",
  },
  {
    question:
      "Which of the following is a CSS framework used for responsive design?",
    choices: ["Node.js", "Tailwind CSS", "MongoDB", "Django"],
    answer: "Tailwind CSS",
  },
  {
    question: "In programming, what is a 'Boolean'?",
    choices: [
      "A type of loop",
      "A value that can be either True or False",
      "A way to style text",
      "A mathematical constant",
    ],
    answer: "A value that can be either True or False",
  },
  {
    question: "Which company developed the React.js library?",
    choices: ["Google", "Apple", "Microsoft", "Meta (Facebook)"],
    answer: "Meta (Facebook)",
  },
];

let currentQuesIndex = 0;
let totalScore = 0;
let prevAnswer = null;
let questime;
let questimer;
startBtn.addEventListener("click", () => {
  questionContainer.classList.remove("hidden");
  startBtn.classList.add("hidden");
  progressBar.classList.remove("hidden");
  showQuestions();
});

nextBtn.addEventListener("click", () => {
  clearInterval(questimer);
  if (prevAnswer != null) validAnswer(prevAnswer);
  if (currentQuesIndex < techQuiz.length - 1) {
    currentQuesIndex++;
    showQuestions();
  }
  calcProgress();
});

endQuiz.addEventListener("click", () => {
  validAnswer(prevAnswer);
  prevAnswer = null;
  currentQuesIndex++;
  calcProgress();
  showResults();
});

restartBtn.addEventListener("click", () => {
  scoreContainer.classList.add("hidden");
  currentQuesIndex = 0;
  totalScore = 0;
  questionContainer.classList.remove("hidden");
  endQuiz.classList.add("hidden");
  showQuestions();
  calcProgress();
});

function showQuestions() {
  clearInterval(questimer);
  endTimer.classList.remove("hidden");
  endTimer.textContent = "30";
  questime = 30;
  questimer = setInterval(() => {
    questime--;
    endTimer.textContent = questime;
    if (questime <= 0) {
      clearInterval(questimer);
      handelTimeout();
    }
  }, 1000);

  questions.textContent = techQuiz[currentQuesIndex].question;
  nextBtn.classList.add("hidden");
  optionContainer.innerHTML = "";

  techQuiz[currentQuesIndex].choices.forEach((ch, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
    <div class="option-container w-full bg-slate-300 text-black mb-2 rounded-lg transition-colors hover:bg-slate-200">
      <label for="op-${index}" class="block px-2 py-1 cursor-pointer w-full h-full">
        <input name="quiz-option" id="op-${index}" type="radio" value="${ch}">
        <span>${ch}</span>
      </label>
    </div>
  `;
    optionContainer.appendChild(li);
    const radioInput = li.querySelector("input");
    radioInput.addEventListener("change", () => {
      prevAnswer = ch;
      if (currentQuesIndex === techQuiz.length - 1) {
        nextBtn.classList.add("hidden");
        endQuiz.classList.remove("hidden");
      } else {
        nextBtn.classList.remove("hidden");
      }
    });
  });
}

function showResults() {
  endTimer.classList.add("hidden");
  scoreContainer.classList.remove("hidden");
  questionContainer.classList.add("hidden");
  score.textContent = totalScore;
}

function validAnswer(choice) {
  let answer = techQuiz[currentQuesIndex].answer;
  if (answer == choice) totalScore++;
}

function calcProgress() {
  let progress = (currentQuesIndex / techQuiz.length) * 100;
  progressBarVisuals.style.width = `${progress}%`;
}

function handelTimeout() {
  validAnswer(prevAnswer);
  prevAnswer = null;
  currentQuesIndex++;
  calcProgress();
  if (currentQuesIndex > techQuiz.length - 1) showResults();
  else showQuestions();
}
