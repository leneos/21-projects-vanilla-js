const startBtn = document.getElementById("start-btn");
const input = document.querySelector("input");
const timerWrapper = document.getElementById("timer-wrapper");
const game = document.getElementById("game");
let timer = document.getElementById("timer");
timer.innerText = `${input.value}.0`;
let score = document.getElementById("score");

//timer
function getTime() {
  return +input.value;
}
function setTimer() {
  let gameTime = getTime();
  gameTime *= 1000;
  let timerInfo = getTime();

  const timerFunc = setInterval(() => {
    gameTime -= 200;
    timerInfo -= 0.2;
    timer.innerText = `${timerInfo.toFixed(1)}`;

    if (gameTime <= 0 || timerInfo <= 0) {
      clearInterval(timerFunc);
      timer.innerText = `${input.value}.0`;
      functionClearField();
      showEl(startBtn);
      showEl(timerWrapper);
    }
  }, 200);
}

//show and hide elements
function showEl(el) {
  el.style.visibility = "visible";
}
function hideEl(el) {
  el.style.visibility = "hidden";
}
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
function functionClearField() {
  game.innerHTML = ``;
}
//generate boxes
// const boxes = [];
function generateBox() {
  let box = document.createElement("div");
  let min = 50;
  let max = 150;
  box.addEventListener("click", function () {
    this.style.display = "none";
    score.innerText = +score.innerText + 1;
    generateBox();
  });
  box.style.cursor = "pointer";
  box.style.width = box.style.height = `${Math.floor(
    Math.random() * (max - min) + min
  )}px`;
  box.style.backgroundColor = getRandomColor();
  box.style.position = "absolute";

  box.style.left = `${Math.floor(Math.random() * 280)}px`;
  box.style.top = `${Math.floor(Math.random() * 280)}px`;

  // boxes.push(box);
  game.appendChild(box);
}

//game init
function initGame() {
  hideEl(startBtn);
  hideEl(timerWrapper);
  setTimer();
  generateBox();
  score.innerText = 0;
}

input.addEventListener("change", () => {
  timer.innerText = input.value;
});
startBtn.addEventListener("click", initGame);
