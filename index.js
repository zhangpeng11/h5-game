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

const gridLength = 20;

let food,snake;
let canvas = document.getElementById("screen");
let start_time = 0;
let score_num = 0;
let direction = "top";
let heben = document.getElementById("heben");
let paike = document.getElementById("paike");

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
  let pos_food = getGridPoint({x:x, y:y});
	food = new Point({x:pos_food.x, y:pos_food.y, gridLength, img: heben});
  food.render();
}

function createSnake() {
  let headPoint = getGridPoint({x:screenWidth/2, y:screenHeight/2});
  snake = new Snake({x: headPoint.x, y: headPoint.y, gridLength: gridLength, img: paike});
  snake.render();
}

function animate(timestamp){
  if(snake.life == "alive"){
    food.shine();
    snake.changeDirection();
    checkBorder();
    checkBody();
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
    direction = "top";
  }
}

function checkBody() {
  for(let i = 2; i < snake.body.length; i++){
    if(snake.headX > (snake.body[i].x - gridLength + 1) && snake.headX < (snake.body[i].x + gridLength - 1) && snake.headY > (snake.body[i].y - gridLength + 1) && snake.headY < (snake.body[i].y + gridLength - 1)){
      console.log("you are dead!");
      snake.destory();
      food.destory();
      score_num = 0;
      direction = "top";
    }
  }
}

function eatFood(){
  if(snake.headX > (food.x - gridLength + 1) && snake.headX < (food.x + gridLength - 1) && snake.headY > (food.y - gridLength + 1) && snake.headY < (food.y + gridLength - 1)){
    food.destory();
    createFood();
    snake.addLength();
    score_num ++;
    // document.getElementsByClassName("score_num")[0].innerText = score_num;
    if(score_num > 20){
      document.getElementsByClassName("power_one")[0].style.backgroundColor = "green";
      endGame();
    } else if(score_num > 15){
      document.getElementsByClassName("power_two")[0].style.backgroundColor = "green";
    } else if(score_num > 10){
      document.getElementsByClassName("power_three")[0].style.backgroundColor = "green";
    } else if(score_num > 5){
      document.getElementsByClassName("power_four")[0].style.backgroundColor = "green";
    }
  }
}

function show_after_game() {
  document.getElementsByClassName("dur_game")[0].style.display = "none";
  document.getElementsByClassName("after_game")[0].style.display = "block";
}

function start_game(){
  createFood();
  createSnake();
  document.getElementsByClassName("pre_game")[0].style.display = "none";
  document.getElementsByClassName("dur_game")[0].style.display = "block";
  document.getElementsByClassName("after_game")[0].style.display = "none";
  document.getElementsByClassName("complete_game")[0].style.display = "none";
  raf(animate);
}

function endGame() {
    snake.destory();
    snake.life = "alive";
    food.destory();
    score_num = 0;
    document.getElementsByClassName("complete_game")[0].style.display = "block";
}

map.render();

document.addEventListener("keydown", e => {
  let directionWill = "none";
  switch(e.keyCode) {
    case 38:
      directionWill = "top";
      break;
    case 39:
      directionWill = "right"
      break;
    case 40:
      directionWill = "bottom";
      break;
    case 37:
      directionWill = "left";
      break;
    default:
      directionWill = "none";
  }

  if((direction == "top" || direction == "bottom") && (directionWill == "top" || directionWill == "bottom") ||(direction == "left" || direction == "right") && (directionWill == "left" || directionWill == "right")){
    return;
  }else{
    direction = directionWill;
  }

  snake.changeDirection(direction);
})

document.getElementsByClassName("start")[0].addEventListener("click", start_game);
document.getElementsByClassName("restart")[0].addEventListener("click", start_game);
document.getElementsByClassName("restart")[1].addEventListener("click", start_game);


// start_game();
// endGame();