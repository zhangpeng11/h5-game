import map from './Map';

export default class Point{

	constructor(opation){
		this.x = opation.x || 0;
		this.y = opation.y || 0;
		this.color = opation.color || "#fff";
		this.gridLength = opation.gridLength || 10;
	}

	render() {
		map.ctx.beginPath();
		map.ctx.fillStyle = this.color;
		map.ctx.fillRect(this.x, this.y, this.gridLength, this.gridLength);
	}

	destory() {
		map.ctx.fillStyle = "#000";
		map.ctx.fillRect(this.x-1, this.y-1, this.gridLength+2, this.gridLength+1);
	}

	shine() {
        this.color = ["#fff", "red"][Math.round(Math.random())];
        // console.log(this.color, this.x, this.y);
		this.render();
	}
}