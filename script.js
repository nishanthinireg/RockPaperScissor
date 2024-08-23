document.querySelector("#startGame").addEventListener("click", () => {
  const userName = document.querySelector(".name").value;
  const totalRounds = document.querySelector(".round").value;

  if (userName && totalRounds > 0) {
    localStorage.setItem("userName", userName);
    localStorage.setItem("totalRounds", totalRounds);
    localStorage.setItem("userScore", 0);
    localStorage.setItem("computerScore", 0);
    window.location.href = "game.html";
  } else {
    if (totalRounds <= 0) {
      alert("The number of rounds must be a positive number.");
    } else {
      alert("Please enter both your name and the number of rounds.");
    }
  }
});
