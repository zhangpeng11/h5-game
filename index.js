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

canvas.width = screenWidth;
canvas.height = screenHeight;
map.init({width:screenWidth, height:screenHeight});

function getGridPoint(point){
  let x = Math.floor(point.x/10)*10;
  let y = Math.floor(point.y/10)*10;
  return {x, y};
}

function createFood(){
	let x = Math.floor(Math.random() * (screenWidth - gridLength));
	let y = Math.floor(Math.random() * (screenHeight - gridLength));
  console.log(x, y);
	food = new Point({x, y, gridLength});
  food.render();
}

function createSnake() {
  // let x = Math.floor(Math.random() * (screenWidth - gridLength));
  // let y = Math.floor(Math.random() * (screenHeight - gridLength));
  let headPoint = getGridPoint({x:screenWidth/2, y:screenHeight/2});
  snake = new Snake(headPoint);
  snake.render();
}

function animate(){
	food.shine();
  if(snake.life == "alive"){
    snake.changeDirection();
    checkBorder();
    eatFood();
  }
  raf(animate);
}

function checkBorder() {
  if(snake.headX < 0 || snake.headX > screenWidth || snake.headY < 0 || snake.headY > screenHeight){
    console.log("you are dead!");
    snake.destory();
  }
}

function eatFood(){
  if(snake.headX > food.x - 1 && snake.headX < food.x + gridLength + 1 && snake.headY > food.y - 1 &&snake.headY < food.y + gridLength +1){
    food.destory();
    snake.addLength();
  }
}

map.render();
createFood();
createSnake();

raf(animate);

document.addEventListener("keydown", function(e){
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
// for(let i = 0; i < 100; i++){
//   food.shine();
// }