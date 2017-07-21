import map from './Map';

export default class Point{

	constructor(opation){
		this.x = opation.x || 0;
		this.y = opation.y || 0;
		this.color = opation.color || "#fff";
		this.gridLength = opation.gridLength || 10;
		this.img = opation.img;
	}

	render() {
		map.ctx.beginPath();
		// map.ctx.fillStyle = this.color;
		// map.ctx.fillRect(this.x, this.y, this.gridLength, this.gridLength);
		map.ctx.drawImage(this.img, this.x, this.y, this.gridLength, this.gridLength);
	}

	destory() {
		map.ctx.fillStyle = "pink";
		map.ctx.fillRect(this.x-1, this.y-1, this.gridLength+2, this.gridLength+1);
	}

	shine() {
		if(this){
  			// map.ctx.drawImage(heben, this.x+10, this.y, this.gridLength, this.gridLength);
	        // this.color = ["#fff", "#000"][Math.round(Math.random())];
			// this.render();
		}
	}
}