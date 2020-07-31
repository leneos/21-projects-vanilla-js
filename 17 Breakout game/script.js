const showRulesBtn = document.getElementById("rules-btn");
const closeRulesBtn = document.getElementById("close-btn");
const rules = document.getElementById("rules");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let score = 0;
const brickColumnCount = 5;
const brickRowCount = 9;
//create ball props
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 4,
  dx: 4,
  dy: -4,
};
const brickInfo = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true,
};

//create paddle props
const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 80,
  h: 10,
  speed: 8,
  dx: 0,
};
//create ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2, true);
  ctx.fillStyle = "#0095dd";
  ctx.fill();
  ctx.closePath();
}

//draw paddle on canvas
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = "#0095dd";
  ctx.fill();
  ctx.closePath();
}

const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickColumnCount; j++) {
    const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
    const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
    bricks[i][j] = { x, y, ...brickInfo };
  }
}

function drawBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.w, brick.h);
      ctx.fillStyle = brick.visible ? "#0095dd" : "transparent";
      ctx.fill();
      ctx.closePath();
    });
  });
}

function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
}
function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;
  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1;
  } else if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1;
  }
  if (
    ball.x - ball.size > paddle.x &&
    ball.x + ball.size < paddle.x + paddle.w &&
    ball.y + ball.size > paddle.y
  ) {
    ball.dy = -ball.speed;
  }
  bricks.forEach((column) => {
    column.forEach((brick) => {
      if (brick.visible) {
        if (
          ball.x - ball.size > brick.x && // left brick side check
          ball.x + ball.size < brick.x + brick.w && // right brick side check
          ball.y + ball.size > brick.y && // top brick side check
          ball.y - ball.size < brick.y + brick.h // bottom brick side check
        ) {
          ball.dy *= -1;
          brick.visible = false;
          increaseScore();
        }
      }
    });
  });
  if (ball.y + ball.size > canvas.height) {
    showAllBricks();
    score = 0;
  }
}
function showAllBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      brick.visible = true;
    });
  });
}
function increaseScore() {
  score++;
  if (score % (brickRowCount * brickColumnCount) === 0) {
    showAllBricks();
  }
}
function movePaddle() {
  paddle.x += paddle.dx;
  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w;
  }
  if (paddle.x < 0) {
    paddle.x = 0;
  }
}
function update() {
  movePaddle();
  moveBall();
  draw();
  requestAnimationFrame(update);
}
update();
function keyDown(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    paddle.dx = paddle.speed;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    paddle.dx = -paddle.speed;
  }
}
function keyUp(e) {
  if (
    e.key === "Right" ||
    e.key === "ArrowRight" ||
    e.key === "Left" ||
    e.key === "ArrowLeft"
  ) {
    paddle.dx = 0;
  }
}
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

showRulesBtn.addEventListener("click", () => rules.classList.add("show"));
closeRulesBtn.addEventListener("click", function () {
  rules.classList.remove("show");
});

// 1. Create canvas context
// 2. create and draw a ball
// 3. create and draw a padlle
// 4. create bricks
// 5. draw scores
// 6. add update() - Animate - requestAnimationFrame(cb)
// 7. move paddle
// 8. keyboard event handlers to move the paddle
// 9. move ball
// 10. add wall bounderies
// 11. increase score when bricks break
// 12. lose - redraw bricks, reset score
