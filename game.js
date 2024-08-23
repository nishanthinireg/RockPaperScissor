let userScore = parseInt(localStorage.getItem("userScore")) || 0;
let computerScore = parseInt(localStorage.getItem("computerScore")) || 0;
let rounds = parseInt(localStorage.getItem("rounds")) || 0;
let names = localStorage.getItem("userName");
const totalRounds = parseInt(localStorage.getItem("totalRounds"));

const resultUpdate = document.querySelector(".result_update");
const userScoreSpan = document.querySelector("#userScore");
const computerScoreSpan = document.querySelector("#computerScore");
const buttons = document.querySelectorAll(".details button");

userScoreSpan.textContent = userScore;
computerScoreSpan.textContent = computerScore;
userName.textContent = names;

function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomChoice = Math.floor(Math.random() * choices.length);
  return choices[randomChoice];
}

function playRound(userChoice) {
  if (rounds >= totalRounds) {
    return;
  }

  const computerChoice = getComputerChoice();
  rounds++;

  let result = "";
  if (userChoice === computerChoice) {
    result = `You chose: ${userChoice} and computer chose: ${computerChoice}. Result: It's a Tie!😉`;
  } else if (
    (userChoice === "rock" && computerChoice === "scissors") ||
    (userChoice === "scissors" && computerChoice === "paper") ||
    (userChoice === "paper" && computerChoice === "rock")
  ) {
    userScore++;
    result = `You chose: ${userChoice} and computer chose: ${computerChoice}. Result: You win!😊`;
  } else {
    computerScore++;
    result = `You chose: ${userChoice} and computer chose: ${computerChoice}. Result: You lose!😞`;
  }

  userScoreSpan.textContent = userScore;
  computerScoreSpan.textContent = computerScore;
  resultUpdate.textContent = `Round ${rounds}: ${result}`;
  resultUpdate.style.marginLeft = "450px";
  resultUpdate.style.fontSize = "20px";

  localStorage.setItem("userScore", userScore);
  localStorage.setItem("computerScore", computerScore);
  localStorage.setItem("rounds", rounds);

  if (rounds === totalRounds) {
    setTimeout(() => {
      resultUpdate.textContent = "";
      declareWinner();
    }, 750);
  }
}

function declareWinner() {
  let winner = "";
  if (userScore > computerScore) {
    winner = `You win the game! Congratulations ${names}`;
    triggerPaperShower();
  } else if (userScore < computerScore) {
    winner = "Computer wins the game!";
  } else {
    winner = "It's a tie!";
  }

  const overallResult = document.createElement("p");
  overallResult.textContent = `Game Over! ${winner}`;
  overallResult.style.color = "green";
  overallResult.style.fontWeight = "bold";
  overallResult.style.fontSize = "22px";
  overallResult.style.marginLeft = "100px";

  resultUpdate.appendChild(overallResult);

  buttons.forEach((button) => {
    button.disabled = true;
  });
}

function triggerPaperShower() {
  const colors = [
    "#ffeb3b",
    "#ff5722",
    "#4caf50",
    "#2196f3",
    "#e91e63",
    "#9c27b0",
    "#00bcd4",
  ];

  for (let i = 0; i < 500; i++) {
    const paperPiece = document.createElement("div");
    paperPiece.classList.add("paper-piece");

    paperPiece.style.left = `${Math.random() * 100}vw`;
    paperPiece.style.top = `${Math.random() * -100}px`;

    paperPiece.style.animationDuration = `${Math.random() * 4 + 1}s`;

    paperPiece.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];

    document.body.appendChild(paperPiece);

    paperPiece.addEventListener("animationend", () => {
      paperPiece.remove();
    });
  }
}

const restartButton = document.querySelector(".restart");

restartButton.addEventListener("click", () => {
  resetGame();
});

function resetGame() {
  userScore = 0;
  computerScore = 0;
  rounds = 0;
  userScoreSpan.textContent = userScore;
  computerScoreSpan.textContent = computerScore;
  resultUpdate.textContent = "";

  localStorage.setItem("userScore", 0);
  localStorage.setItem("computerScore", 0);
  localStorage.setItem("rounds", 0);

  buttons.forEach((button) => {
    button.disabled = false;
  });
}

buttons.forEach((button, index) => {
  button.addEventListener("click", () => {
    const choices = ["rock", "paper", "scissors"];
    playRound(choices[index]);
  });
});
