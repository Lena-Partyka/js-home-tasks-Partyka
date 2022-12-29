'use strict';

const boardWidth = 600; // размеры поля
const boardHeight = 400;
const ballSize = 30; // размер мяча
const platformSize = 100; // размер ракетки
const platformWidth = platformSize * 0.2;
const wrapper = document.getElementById('wrapper');
//wrapper.appendChild(createScoreLeftPlayer());
//wrapper.appendChild(createScoreRightPlayer());
wrapper.appendChild(createBoard());

function createBoard() {
  let board = document.createElement('div');
  board.id = 'board';
  board.style.width = boardWidth + 'px';
  board.style.height = boardHeight + 'px';
  board.appendChild(createScore('scoreLeftPlayer'));
  board.appendChild(createScore('scoreRightPlayer'));
  board.appendChild(createBall(ballSize));
  board.appendChild(createLeftPlayer(platformSize));
  board.appendChild(createRightPlayer(platformSize));
  return board;
}

function createScore(scoreType) {
  let score = document.createElement('div');
  score.id = scoreType;
  score.textContent = '0';
  return score;
}

function createBall(size) {
  let ball = document.createElement('div');
  ball.id = 'ball';
  ball.style.width = size + 'px';
  ball.style.height = size + 'px';
  return ball;
}
function createLeftPlayer(platform) {
  let leftPlayer = document.createElement('div');
  leftPlayer.className = 'leftPlayer';
  leftPlayer.style.width = platform * 0.2 + 'px';
  leftPlayer.style.height = platform + 'px';
  return leftPlayer;
}

function createRightPlayer(platform) {
  let rightPlayer = document.createElement('div');
  rightPlayer.className = 'rightPlayer';
  rightPlayer.style.width = platform * 0.2 + 'px';
  rightPlayer.style.height = platform + 'px';
  return rightPlayer;
  }

let board = document.querySelector('#board');
let leftPlayer = document.querySelector('.leftPlayer'); // userPaddle
let rightPlayer = document.querySelector('.rightPlayer'); // compPaddle
let ball = document.querySelector('#ball');

leftPlayer.style.top = boardHeight / 2 - platformSize / 2 + 'px';
leftPlayer.style.left = 0 + 'px';
rightPlayer.style.top = boardHeight / 2 - platformSize / 2 + 'px';
rightPlayer.style.left = boardWidth - platformSize * 0.2 + 'px';
ball.style.top = boardHeight / 2 - ballSize / 2 + 'px';
ball.style.left = boardWidth / 2 - ballSize / 2 + 'px';

let Shift_pressed = false;
let Ctrl_pressed = false;
let Up_pressed = false;
let Down_pressed = false;
let ID;
let Vx = -1; // значения компонентов скорости Vx - скорость мяча по оси x,  Vy - по оси y
let Vy = -1;
let V = Math.sqrt(Math.sqrt(Math.pow(Vx, 2) + Math.pow(Vy, 2)));

document.addEventListener('keydown', (e) => {
  if (e.keyCode == '16') {
    Shift_pressed = true;
  } else if(e.keyCode == '17') {
    Ctrl_pressed = true;
  }
});

document.addEventListener('keyup', (e) => {
  if (e.keyCode == '16') {
    Shift_pressed = false;
  } else if(e.keyCode == '17') {
    Ctrl_pressed = false;
  }
});

document.addEventListener('keydown', (e) => {
  if (e.keyCode == '38') {
    Up_pressed = true;
  } else if(e.keyCode == '40') {
    Down_pressed = true;
  }
});

document.addEventListener('keyup', (e) => {
  if (e.keyCode == '38') {
    Up_pressed = false;
  } else if(e.keyCode == '40') {
    Down_pressed = false;
  }
});

gameLoop();

function reset() {
  clearInterval(ID);
  Vx = -1;
  Vy = -1;
  V = Math.sqrt(Math.sqrt(Math.pow(Vx, 2) + Math.pow(Vy, 2)));
  ball.style.top = boardHeight / 2 - ballSize / 2 + 'px';
  ball.style.left = boardWidth / 2 - ballSize / 2 + 'px';
  gameLoop();
}

function gameLoop() { // с каждым приходящим интервалом увеличиваем значение marginLeft и marginTop на Vx и Vy соответственно
  setTimeout(() => {
    ID = setInterval(() => {
      if(marginLeft(ball) < 0) {
        document.querySelector('#scoreRightPlayer').innerHTML = Number(document.querySelector('#scoreRightPlayer').innerHTML) + 1;
        reset();
        return;
      }

      if ((marginLeft(ball) + ballSize) > boardWidth) {
        document.querySelector('#scoreLeftPlayer').innerHTML = Number(document.querySelector('#scoreLeftPlayer').innerHTML) + 1;
        reset();
        return;
      }

      if(marginTop(ball) < 0 || (marginTop(ball) + ballSize) > boardHeight) {
        Vy = -Vy;
      }

      let paddle = (marginLeft(ball) + ballSize / 2 < boardWidth / 2) ? leftPlayer : rightPlayer;
      // предполагаем, с какой ракеткой столкнулся мяч, с левой или с правой

      if (collisionDetected(paddle)) {
        let angle;
        let type = (marginLeft(paddle) == 40) ? 'left' : 'right';
        if (ball.centerY < paddle.centerY) {
          angle = (type == 'left' ? -Math.PI/4 : (-3 * Math.PI)/4)
        } else if (ball.centerY > paddle.centerY) {
          angle = (type == 'left' ? Math.PI/4 : (3 * Math.PI)/4)
        } else if (ball.centerY == paddle.centerY) {
          angle = (type == 'left' ? 0 : Math.PI)
        }
        V +=0.5; // скорость мяча увеличивается после столкновения с ракеткой
        Vx = V * Math.cos(angle);
        Vy = V * Math.sin(angle);
      }

      ball.style.left = `${ marginLeft(ball) + Vx }px`;
      ball.style.top = `${ marginTop(ball) + Vy }px`;

      if(Shift_pressed && marginTop(leftPlayer) > 0) {
        leftPlayer.style.top = `${ marginTop(leftPlayer)-2 }px`
      } else if(Ctrl_pressed && marginTop(leftPlayer) < boardHeight - platformSize){
        leftPlayer.style.top = `${ marginTop(leftPlayer)+2 }px`
      }

      if(Up_pressed && marginTop(rightPlayer) > 0) {
        rightPlayer.style.top = `${ marginTop(rightPlayer)-2 }px`
      } else if(Down_pressed && marginTop(rightPlayer) < boardHeight - platformSize){
        rightPlayer.style.top = `${ marginTop(rightPlayer)+2 }px`
      }
    }, 5)
  }, 500)
}

function collisionDetected(paddle) {
  ball.top = marginTop(ball);
  ball.bottom = marginTop(ball) + ballSize;
  ball.left = marginLeft(ball);
  ball.right = marginTop(ball) + ballSize;
  ball.centerX = marginLeft(ball) + ballSize / 2;
  ball.centerY = marginTop(ball) + ballSize / 2;

  paddle.top = marginTop(paddle);
  paddle.bottom = marginTop(paddle) + platformSize;
  paddle.left = marginLeft(paddle);
  paddle.right = marginLeft(paddle) + platformWidth;
  paddle.centerX = marginLeft(paddle) + platformWidth / 2;
  paddle.centerY = marginTop(paddle) + platformSize / 2;

  return ball.left < paddle.right && ball.top < paddle.bottom && ball.right > paddle.left && ball.bottom > paddle.top;
}

// возвращает числовое значение свойства
function marginTop(elem) {
  return Number(elem.style.top.split('p')[0])
}

function marginLeft(elem) {
  return Number(elem.style.left.split('p')[0])
}






/*function createScoreLeftPlayer() {
  let scoreLeftPlayer = document.createElement('div');
  scoreLeftPlayer.className = 'score_LeftPlayer';
}

function createScoreRightPlayer() {
  let scoreRightPlayer = document.createElement('div');
  scoreRightPlayer.className = 'score_RightPlayer';
}*/





