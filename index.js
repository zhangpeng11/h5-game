import map from './js/Map';
import Point from './js/Point';
import Snake from './js/Snake';

const raf = window.requestAnimationFrame
  || window.webkitRequestAnimationFrame
  || window.mozRequestAnimationFrame
  || window.oRequestAnimationFrame
  || window.msRequestAnimationFrame
  || function(callback) {
    window.setTimeout(callback, 1000 / 60);
  };

const screenWidth = window.innerWidth,
	screenHeight = window.innerHeight;

const gridLength = 10;

let food,snake;
let canvas = document.getElementById("screen");
let start_time = 0;
let score_num = 0;

canvas.width = screenWidth;
canvas.height = screenHeight;
map.init({width:screenWidth, height:screenHeight});

function getGridPoint(point){
  let x = Math.floor(point.x/10)*10;
  let y = Math.floor(point.y/10)*10;
  return {x, y};
}

function createFood(){
	let x = Math.random() * (screenWidth - gridLength);
	let y = Math.random() * (screenHeight - gridLength);
  let pos_food = getGridPoint({x, y});
	food = new Point({x:pos_food.x, y:pos_food.y, gridLength});
  food.render();
}

function createSnake() {
  let headPoint = getGridPoint({x:screenWidth/2, y:screenHeight/2});
  snake = new Snake(headPoint);
  snake.render();
}

function animate(timestamp){
  if(snake.life == "alive"){
    food.shine();
    snake.changeDirection();
    checkBorder();
    eatFood();
    setTimeout(function(){
      raf(animate);
    },200)
  } else {
    show_after_game();
  }
}

function checkBorder() {
  if(snake.headX < 0 || snake.headX > screenWidth || snake.headY < 0 || snake.headY > screenHeight){
    console.log("you are dead!");
    snake.destory();
    food.destory();
    score_num = 0;
  }
}

function eatFood(){
  if(snake.headX > (food.x - gridLength + 1) && snake.headX < (food.x + gridLength - 1) && snake.headY > (food.y - gridLength + 1) && snake.headY < (food.y + gridLength - 1)){
    food.destory();
    debugger
    createFood();
    snake.addLength();
    score_num ++;
    document.getElementsByClassName("score_num")[0].innerText = score_num;
  }
}

function show_after_game() {
  document.getElementsByClassName("dur_game")[0].style.display = "none";
  document.getElementsByClassName("after_game")[0].style.display = "block";
}

function start_game(){
  createFood();
  createSnake();
  raf(animate);
  document.getElementsByClassName("pre_game")[0].style.display = "none";
  document.getElementsByClassName("dur_game")[0].style.display = "block";
  document.getElementsByClassName("after_game")[0].style.display = "none";
}

map.render();

document.addEventListener("keydown", e => {
  let direction = top;
  switch(e.keyCode) {
    case 38:
      direction = "top";
      break;
    case 39:
      direction = "right"
      break;
    case 40:
      direction = "bottom";
      break;
    case 37:
      direction = "left";
      break;
    default:
      direction = "none";
  }

  if(direction == "none"){
    return;
  }

  snake.changeDirection(direction);
})

document.getElementsByClassName("start")[0].addEventListener("click", start_game);
document.getElementsByClassName("restart")[0].addEventListener("click", start_game);