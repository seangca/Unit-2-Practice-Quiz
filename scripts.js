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
    q1: "c",  // Sperm mature in the epididymis.
    q2: "c",  // Seminal vesicles contribute fructose to semen.
    q3: "a",  // Sperm are transported via the vas deferens.
    q4: "b",  // Sertoli cells support and nourish sperm cells.
    q5: "c",  // LH stimulates testosterone production.
    q6: "b",  // Ovaries produce female gametes.
    q7: "c",  // An LH surge triggers ovulation.
    q8: "a",  // The corpus luteum produces estrogen and progesterone.
    q9: "c",  // Fertilization typically occurs in the Fallopian tubes.
    q10: "c", // hCG maintains the corpus luteum during early pregnancy.

    // Group 2 (Questions 11–20)
    q11: "a", // The placenta’s main function is gas, nutrient, and waste exchange.
    q12: "b", // Ovulation is the release of a mature egg from the ovary.
    q13: "a", // The endometrium is the lining of the uterus.
    q14: "b", // The cervix connects the uterus to the vagina.
    q15: "b", // Testosterone is produced by interstitial (Leydig) cells.
    q16: "c", // The acrosome releases enzymes to penetrate the egg.
    q17: "a", // The ovarian cycle has two main phases: follicular and luteal.
    q18: "c", // Progesterone prevents ovulation during pregnancy.
    q19: "a", // The first breast secretion is colostrum.
    q20: "c", // Sperm are produced in the seminiferous tubules.

    // Group 3 (Questions 21–30)
    q21: "d", // Prolactin stimulates milk production.
    q22: "b", // Menopause is the cessation of menstruation.
    q23: "c", // A condom is a barrier method of birth control.
    q24: "b", // The umbilical cord connects the fetus to the placenta.
    q25: "c", // Implantation is when an embryo embeds into the uterus.
    q26: "b", // The uterus contracts to expel the baby during childbirth.
    q27: "a", // The zona pellucida prevents multiple sperm from fertilizing the egg.
    q28: "c", // The prostate gland produces prostaglandins that aid uterine contractions.
    q29: "c", // Inhibin’s role is to inhibit FSH production.
    q30: "c", // The outermost embryonic layer is the ectoderm.

    // Group 4 (Questions 31–40)
    q31: "b", // Estrogen maintains female secondary sex characteristics.
    q32: "b", // A fertilized egg is called a zygote.
    q33: "b", // Oxytocin is responsible for labor contractions.
    q34: "b", // The primary purpose of the amniotic sac is to protect the fetus.
    q35: "a", // The first stage of parturition (labor) is dilation.
    q36: "d", // The first stage of embryonic development is the zygote.
    q37: "b", // A gamete is a reproductive cell.
    q38: "a", // Sperm are stored in the epididymis before ejaculation.
    q39: "c", // An IUD prevents implantation.
    q40: "b", // The chorion is involved in gas exchange and placenta formation.

    // Group 5 (Questions 41–50)
    q41: "c", // A morula is a solid ball of cells formed after fertilization.
    q42: "d", // HPV (Human papillomavirus) is a virus that can lead to cervical cancer.
    q43: "c", // Pregnancy tests detect hCG.
    q44: "b", // Birth control pills use progesterone to prevent ovulation.
    q45: "b", // The endometrium is the uterine lining that sheds during menstruation.
    q46: "b", // Gonorrhea is a bacterial STI that can lead to PID.
    q47: "b", // The allantois forms blood vessels for waste removal.
    q48: "c", // Implantation of the embryo occurs at the blastocyst stage.
    q49: "b", // The placenta allows oxygen and nutrients to pass from mother to fetus.
    q50: "b"  // Relaxin softens the cervix and loosens ligaments during pregnancy.
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
