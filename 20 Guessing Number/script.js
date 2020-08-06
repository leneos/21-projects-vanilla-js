const msgEl = document.getElementById("msg");

const getRandomNumber = () => {
  return Math.floor(Math.random() * 100) + 1;
};
const randomNum = getRandomNumber();

console.log("Correct number is: ", randomNum);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();
// recognition.lang = "en-US";
recognition.start();

const writeMessage = (msg) => {
  msgEl.innerHTML = `<div>You said:</div>
      <span class="box">${msg}</span>
 `;
};
const checkNumber = (msg) => {
  const num = +msg;
  if (Number.isNaN(num)) {
    msgEl.innerHTML += `<div>This is not a valid number</div>`;
    return;
  }
  if (num > 100 || num < 1) {
    msgEl.innerHTML = `<div>Number must be between 1 and 100</div>`;
    return;
  }
  if (num === randomNum) {
    document.body.innerHTML = `<h2>Conrats! You have guessed the number! <br><br> It was ${num}</h2>
    <button class="play-again" id="play-again">Play again</button>`;
  } else if (num > randomNum) {
    msgEl.innerHTML += `<div>GO LOWER</div>`;
  } else {
    msgEl.innerHTML += `<div>GO HIGHER</div>`;
  }
};
const onSpeak = (e) => {
  const message = e.results[0][0].transcript;
  console.log(message);
  writeMessage(message);
  checkNumber(message);
};
recognition.addEventListener("result", onSpeak);
recognition.addEventListener("end", () => {
  recognition.start();
});

document.body.addEventListener("click", (e) => {
  if (e.target.id === "play-again") {
    window.location.reload();
  }
});
