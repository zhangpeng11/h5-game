class Map{
	init(opation) {
		this.canvas = document.getElementById("screen");
		this.ctx = this.canvas.getContext("2d");
		this.width = opation.width || 375;
		this.height = opation.height || 667;
		this.ctx.fillStyle = opation.color || "black";
	}

	clear() {
		this.ctx.clearRect(0, 0, this.width, this.height);
	}

	render() {
        this.ctx.fillRect(0, 0, this.width, this.height);		
	}
}

export default new Map();