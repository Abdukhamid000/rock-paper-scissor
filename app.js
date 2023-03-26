const rock_svg = document.querySelector("#rock");
const paper_svg = document.querySelector("#paper");
const scissor_svg = document.querySelector("#scissor");
const game = document.querySelector("#game");
const player = document.querySelector(".player__bg");
const picked = document.querySelector(".picked");
const cpu__bg = document.querySelector(".cpu__bg");
const playAgainBtn = document.querySelector(".btn_play_again");
const win = document.querySelector("#win-text");
const lose = document.querySelector("#lose-text");
const draw = document.querySelector("#draw-text");
const score = document.querySelector("#score");

if (!localStorage.getItem("score")) {
  localStorage.setItem("score", 0);
} else {
  score.textContent = localStorage.getItem("score");
}

game.addEventListener("click", (e) => {
  const svg = e.target.cloneNode();
  game.style.display = "none";
  picked.style.display = "grid";
  player.appendChild(svg);

  const svgs = [rock_svg, paper_svg, scissor_svg];
  const random = Math.floor(Math.random() * 3);
  setTimeout(() => {
    cpu__bg.appendChild(svgs[random]);
  }, 0);

  checkForLose(svg, svgs, random);
  checkForWin(svg, svgs, random);
});

const confettiConfig = {
  particleCount: 200,
  spread: 100,
  origin: { y: 0.6 },
};

function saveToLocalStorage(score) {
  localStorage.setItem("score", score);
}

function countScore() {
  win.textContent = "YOU WIN";
  score.textContent = +score.textContent + 1;
}

function checkForWin(svg, svgs, random) {
  if (svgs[random].id === "rock" && svg.id === "paper") {
    countScore();
    confetti(confettiConfig);
    saveToLocalStorage(score.textContent);
  } else if (svgs[random].id === "paper" && svg.id === "scissor") {
    countScore();
    confetti(confettiConfig);
    saveToLocalStorage(score.textContent);
  } else if (svgs[random].id === "scissor" && svg.id === "rock") {
    countScore();
    confetti(confettiConfig);
    saveToLocalStorage(score.textContent);
  }
}

function checkForLose(svg, svgs, random) {
  if (svgs[random].id === svg.id) {
    draw.textContent = "DRAW";
  } else if (svgs[random].id === "paper" && svg.id === "rock") {
    lose.textContent = "YOU LOSE";
  } else if (svgs[random].id === "scissor" && svg.id === "paper") {
    lose.textContent = "YOU LOSE";
  } else if (svgs[random].id === "rock" && svg.id === "scissor") {
    lose.textContent = "YOU LOSE";
  }
}

playAgainBtn.addEventListener("click", () => {
  location.reload();
});
