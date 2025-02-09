document.addEventListener("DOMContentLoaded", () => { // initialize the variables first
  const quizForm = document.getElementById("quiz");
  const submitButton = document.getElementById("submit");
  const resetButton = document.getElementById("reset");
  const resultsSection = document.getElementById("results");
  const scoreElement = document.getElementById("score");
  const timerElement = document.getElementById("timer");
  const questions = Array.from(document.querySelectorAll(".question"));

  const correctAnswers = { // correct answers
    // Group 1 (Questions 1–10)
    q1: "c",  // Epididymis
    q2: "c",  // Seminal vesicles
    q3: "a",  // Vas deferens
    q4: "b",  // Support and nourish sperm cells (Sertoli cells)
    q5: "c",  // LH (stimulates testosterone production)
    q6: "b",  // Ovaries (produce female gametes)
    q7: "c",  // LH (triggers ovulation)
    q8: "a",  // Corpus luteum produces estrogen and progesterone
    q9: "c",  // Fallopian tubes (site of fertilization)
    q10: "c", // hCG (maintains the corpus luteum during early pregnancy)

    // Group 2 (Questions 11–20)
    q11: "a", // Gas, nutrient, and waste exchange (placenta function)
    q12: "b", // Ovulation (release of a mature egg)
    q13: "a", // Uterus (the endometrium is its lining)
    q14: "b", // Cervix (connects the uterus to the vagina)
    q15: "b", // Interstitial (Leydig) cells produce testosterone
    q16: "c", // Acrosome releases enzymes to penetrate the egg
    q17: "a", // Follicular and luteal phases (ovarian cycle)
    q18: "c", // Progesterone (prevents ovulation during pregnancy)
    q19: "a", // Colostrum (first breast secretion rich in protein and antibodies)
    q20: "c", // Seminiferous tubules (produce sperm)

    // Group 3 (Questions 21–30)
    q21: "d", // Prolactin (stimulates milk production)
    q22: "b", // Menopause (cessation of menstruation)
    q23: "c", // Condom (a barrier method of birth control)
    q24: "b", // Connects the fetus to the placenta (umbilical cord)
    q25: "c", // Implantation (embryo implants into the uterus)
    q26: "b", // Uterus (contracts to push the baby out during childbirth)
    q27: "a", // Zona pellucida (prevents multiple sperm from fertilizing the egg)
    q28: "c", // Prostate gland (produces prostaglandins that cause uterine contractions)
    q29: "c", // Inhibits FSH production (role of inhibin in male reproduction)
    q30: "c", // Ectoderm (outermost layer of the embryo)

    // Group 4 (Questions 31–40)
    q31: "b", // Estrogen maintains female secondary sex characteristics
    q32: "b", // Zygote (a fertilized egg)
    q33: "b", // Oxytocin (responsible for labor contractions)
    q34: "b", // Amniotic sac (protects the fetus)
    q35: "a", // Dilation (first stage of parturition/labor)
    q36: "d", // Zygote (the first stage of embryonic development)
    q37: "b", // A gamete is a reproductive cell
    q38: "a", // Epididymis (where sperm are stored before ejaculation)
    q39: "c", // IUD (prevents implantation)
    q40: "b", // Chorion (involved in gas exchange and placenta formation)

    // Group 5 (Questions 41–50)
    q41: "c", // Morula (solid ball of cells after fertilization)
    q42: "d", // Human papillomavirus (HPV) (virus causing cervical cancer)
    q43: "c", // hCG (hormone detected in pregnancy tests)
    q44: "b", // Progesterone (in birth control pills prevents ovulation)
    q45: "b", // Endometrium (layer of the uterus that sheds during menstruation)
    q46: "b", // Gonorrhea (bacterial STI leading to PID)
    q47: "b", // Allantois (forms blood vessels for waste removal)
    q48: "c", // Blastocyst (stage when the embryo implants into the uterine wall)
    q49: "b", // Placenta (allows oxygen and nutrients to pass from mother to fetus)
    q50: "b"  // Relaxin (softens the cervix and loosens ligaments)
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
