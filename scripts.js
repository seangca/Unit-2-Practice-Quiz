document.addEventListener("DOMContentLoaded", () => {
  const quizForm = document.getElementById("quiz");
  const submitButton = document.getElementById("submit");
  const resetButton = document.getElementById("reset");
  const resultsSection = document.getElementById("results");
  const scoreElement = document.getElementById("score");
  const timerElement = document.getElementById("timer");
  const questions = Array.from(document.querySelectorAll(".question"));
  const matchingQuestions = Array.from(document.querySelectorAll(".matching select"));

  const correctAnswers = { 
    q1: "c", q2: "c", q3: "a", q4: "b", q5: "c", q6: "b", q7: "c", q8: "a", q9: "c", q10: "c",
    q11: "a", q12: "b", q13: "a", q14: "b", q15: "b", q16: "c", q17: "a", q18: "c", q19: "a", q20: "c",
    q21: "d", q22: "b", q23: "c", q24: "b", q25: "c", q26: "b", q27: "a", q28: "c", q29: "c", q30: "c",
    q31: "b", q32: "b", q33: "b", q34: "b", q35: "a", q36: "d", q37: "b", q38: "a", q39: "c", q40: "b",
    q41: "c", q42: "d", q43: "c", q44: "b", q45: "b", q46: "b", q47: "b", q48: "c", q49: "b", q50: "b",
    match1: "Ovulation", match2: "Fertilization", match3: "Cleavage", match4: "Morula Formation",
    match5: "Early Blastocyst Formation", match6: "Implantation", matcha: "corona radiata", matchb: "zona pellucida",
    matchc: "sperm nucleus", matchd: "oocyte nucleus", matche: "zygote",
    matchf: "2-cell stage", matchg: "4-cell stage", matchh: "8-cell stage", matchi: "inner cell mass",
    matchj: "trophoblast", matchk: "fimbriae", matchl: "ovary", matchm: "uterine tube (oviduct)"  
  };

  let timer = 1800;
  let timerInterval;

  const updateTimer = () => {
    const minutes = Math.floor(timer / 60).toString().padStart(2, "0");
    const seconds = (timer % 60).toString().padStart(2, "0");
    timerElement.textContent = `${minutes}:${seconds}`;

    if (timer <= 0) {
      clearInterval(timerInterval);
      timerElement.textContent = "00:00";
      alert("Time's up! Your quiz is being submitted.");
      submitQuiz();
    }
    timer--;
  };

  const highlightAnswers = () => {
    questions.forEach((question) => {
      const selected = question.querySelector("input:checked");
      const correct = correctAnswers[question.id];

      question.querySelectorAll(".answer").forEach((answer) => {
        answer.classList.remove("correct", "incorrect");
      });

      if (selected) {
        if (selected.value === correct) {
          selected.parentElement.classList.add("correct");
        } else {
          selected.parentElement.classList.add("incorrect");
        }
      }

      if (!selected || selected.value !== correct) {
        const correctAnswerElement = question.querySelector(`input[value="${correct}"]`);
        if (correctAnswerElement) {
          correctAnswerElement.parentElement.classList.add("correct");
        }
      }
    });

    matchingQuestions.forEach((select) => {
      const correct = correctAnswers[select.id];
      select.classList.remove("correct", "incorrect");

      if (select.value === correct) {
        select.classList.add("correct");
      } else {
        select.classList.add("incorrect");
      }
    });
  };

  const submitQuiz = () => {
    console.log("Submit button clicked!");
    
    // Calculate multiple-choice score
    let score = questions.reduce((total, question) => {
      const selected = question.querySelector("input:checked");
      return selected && selected.value === correctAnswers[question.id] ? total + 1 : total;
    }, 0);

    // Calculate matching questions score
    score += matchingQuestions.reduce((total, select) => {
      return select.value === correctAnswers[select.id] ? total + 1 : total;
    }, 0);

    highlightAnswers();
    
    console.log("Final score:", score);
    console.log("Total questions:", questions.length + matchingQuestions.length); // Should be 66

    scoreElement.textContent = `You scored ${score} out of 66!`;

    resultsSection.style.display = "block";

    document.querySelectorAll("input[type='radio']").forEach((radio) => (radio.disabled = true));
    matchingQuestions.forEach((select) => (select.disabled = true));

    submitButton.style.display = "none";
    clearInterval(timerInterval);
    timerElement.textContent = "00:00";
  };

  const resetQuiz = () => {
    if (!confirm("Are you sure you want to reset the quiz?")) return;

    quizForm.reset();
    resultsSection.style.display = "none";

    questions.forEach((question) => {
      question.querySelectorAll(".answer").forEach((answer) => {
        answer.classList.remove("correct", "incorrect");
      });
    });

    matchingQuestions.forEach((select) => {
      select.classList.remove("correct", "incorrect");
      select.value = ""; // Clears dropdown selections
      select.disabled = false;
    });

    document.querySelectorAll("input[type='radio']").forEach((radio) => (radio.disabled = false));

    timer = 1800;
    timerElement.textContent = "30:00";
    submitButton.style.display = "block";
    startTimer();
  };

  const startTimer = () => {
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
  };

  submitButton.addEventListener("click", () => {
    if (confirm("Confirm submission?")) {
      submitQuiz();
    }
  });

  resetButton.addEventListener("click", resetQuiz);

  startTimer();
});
