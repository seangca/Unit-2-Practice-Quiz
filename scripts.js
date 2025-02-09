document.addEventListener("DOMContentLoaded", () => { // initialize the variables first
  const quizForm = document.getElementById("quiz");
  const submitButton = document.getElementById("submit");
  const resetButton = document.getElementById("reset");
  const resultsSection = document.getElementById("results");
  const scoreElement = document.getElementById("score");
  const timerElement = document.getElementById("timer");
  const questions = Array.from(document.querySelectorAll(".question"));

  const correctAnswers = { // correct answers
    q1: "c", q2: "c", q3: "a", q4: "b", q5: "b",
    q6: "c", q7: "b", q8: "c", q9: "c", q10: "b",
    q11: "a", q12: "b", q13: "b", q14: "a", q15: "b",
    q16: "c", q17: "a", q18: "b", q19: "c", q20: "d",
    q21: "c", q22: "b", q23: "b", q24: "a", q25: "c",
    q26: "d", q27: "c", q28: "b", q29: "a", q30: "b",
    q31: "b", q32: "a", q33: "a", q34: "c", q35: "d",
    q36: "b", q37: "c", q38: "a", q39: "d", q40: "b",
    q41: "c", q42: "d", q43: "c", q44: "b", q45: "b",
    q46: "b", q47: "b", q48: "c", q49: "b", q50: "b"
};


  let timer = 1800; 
  let timerInterval;

  const updateTimer = () => { // timer with updater
    const minutes = Math.floor(timer / 60).toString().padStart(2, "0");
    const seconds = (timer % 60).toString().padStart(2, "0");
    timerElement.textContent = `${minutes}:${seconds}`; 

    if (timer <= 0) { // submits when timer runs out
      clearInterval(timerInterval);
      alert("You've run out of time! Please review your practice test and reset to attempt again.");
      submitQuiz();
    }
    timer--;
  };

  const highlightAnswers = () => { // highlight correct answers (user must incorrectly answer a question see incorrect answer highlighted in red)
    questions.forEach((question) => {
      const selected = question.querySelector("input:checked");
      const correct = correctAnswers[question.id];

      question.querySelectorAll(".answer").forEach((answer) => {
        answer.classList.remove("correct", "incorrect");
      });

      if (selected) {
        selected.parentElement.classList.add(
          selected.value === correct ? "correct" : "incorrect"
        );
      }

      question.querySelector(`input[value="${correct}"]`).parentElement.classList.add("correct");
    });
  };

  const submitQuiz = () => {
    let score = questions.reduce((total, question) => {
      const selected = question.querySelector("input:checked");
      if (selected && selected.value === correctAnswers[question.id]) {
        return total + 1;
      } else {
        return total;
      }
    }, 0); // goes through each question, incrementing by 1 for correct answer

    highlightAnswers();
    scoreElement.textContent = `You scored ${score} out of ${questions.length}!`; // the score user recieved 
    resultsSection.style.display = "block"; // toggle results on
    document.querySelectorAll("input[type='radio']").forEach((radio) => (radio.disabled = true));
    submitButton.style.display = "none";
    clearInterval(timerInterval); 
    timerElement.textContent = "00:00"; // shows this time on timer when submitted
  };

  const resetQuiz = () => {
    quizForm.reset();
    resultsSection.style.display = "none"; // when reset button is clicked, display: none (does not show)
    questions.forEach((question) => {
      question.querySelectorAll(".answer").forEach((answer) => {
        answer.classList.remove("correct", "incorrect");
      });
    });

    document.querySelectorAll("input[type='radio']").forEach((radio) => (radio.disabled = false)); // disables radio buttons when quiz is submitted
    timer = 1800;
    timerElement.textContent = "30:00"; // restores 30 minutes when reseted
    submitButton.style.display = "block";
    startTimer();
  };

  // set a new interval 
  const startTimer = () => {
    clearInterval(timerInterval); 
    timerInterval = setInterval(updateTimer, 1000);
  };

  // event listeners for buttons
  submitButton.addEventListener("click", () => {
    if (confirm("Please confirm to submit the practice test. You will not be able to change your answers after submission unless reseted.")) { //confirmation to submit
      submitQuiz();
    }
  });

  resetButton.addEventListener("click", resetQuiz); 

  startTimer(); // start timer on page start
});
