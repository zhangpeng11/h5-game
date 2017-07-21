import map from './Map';
import Point from './Point';

export default class Snake {

	constructor(opation) {
		this.length = opation.length || 3;
		this.color = opation.color || "white";
		this.headX = opation.x || 180;
		this.headY = opation.y || 30;
		this.direction = "top";
		this.gridLength = opation.gridLength || 10;
		this.body = [];
		this.life = "alive";
		this.img = opation.img;
	}

	render() {
		for(let i = 0; i < this.length; i ++){
			let point = new Point({x:this.headX, y:this.headY - this.gridLength * i, gridLength: this.gridLength, img: this.img});
			point.render();	
			this.body.push(point);
		}
	}

	destory() {
		for(let i = 0; i < this.length; i ++){
			this.body[i].destory();
		}
		this.body = null;
		this.life = "dead";
	}

	changeDirection(direction) {
		direction && (this.direction = direction);
		switch(this.direction){
			case "top":
				this.headY -= this.gridLength;
				break;
			case "left":
				this.headX -= this.gridLength;
				break;
			case "bottom":
				this.headY += this.gridLength;
				break;
			case "right":
				this.headX += this.gridLength;
				break;
			default:
				this.headY -= this.gridLength;
		}

		this.move();
	}

	move() {
		if(this.life == "dead"){
			console.log("you has dead");
		}
		let point = new Point({x:this.headX, y:this.headY, gridLength: this.gridLength, img: this.img});
		this.body[this.length-1].destory();
		this.body.pop();
		this.body.unshift(point);
		this.body[0].render();
	}

	addLength() {
		let tailX = 0;
		let tailY = 0;
		switch(this.direction){
			case "top":
				tailX = this.headX;
				tailY = this.headY + this.length * this.gridLength;
				break;
			case "left":
				tailX = this.headX + this.length * this.gridLength;
				tailY = this.headY;
				break;
			case "bottom":
				tailX = this.headX;
				tailY = this.headY - this.length * this.gridLength;
				break;
			case "right":
				tailX = this.headX - this.length * this.gridLength;
				tailY = this.headY;
				break;
			default:
				tailX = this.headX;
				tailY = this.headY + this.length * this.gridLength;
		}

		let point = new Point({x:tailX, y:tailY, img: this.img});
		this.body.push(point);
		this.length = this.body.length;
		this.body[this.length - 1].render();
	}
}