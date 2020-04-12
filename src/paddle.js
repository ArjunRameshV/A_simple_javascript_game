export default class Paddle {
	constructor(game) {
		this.gameWidth = game.gameWidth;
		this.width = 150;
		this.height = 30;
		this.maxSpeed = 6;
		this.speed = 0;
		this.position = {
			x: game.gameWidth / 2 - this.width / 2,
			y: game.gameHeight - this.height - 10
		};
	}

	moveLeft() {
		//negative because we need it to move left
		this.speed = -this.maxSpeed;
	}
	moveRight() {
		this.speed = this.maxSpeed;
	}
	stop() {
		this.speed = 0;
	}

	draw(ctx) {
		ctx.fillStyle = '#0f0';
		ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
	}
	update(dt) {
		// to see the changes that are made
		//dt here represents the change in time
		// or rather delta time
		// if (!dt) return; REMOVED since timeloop added
		//the above beacuse we nned to call it once
		//without any timestamp0
		this.position.x += this.speed;
		//to make sure that the paddle does not leave
		//the screen
		if (this.position.x < 0) this.position.x = 0;
		if (this.position.x + this.width > this.gameWidth)
			this.position.x = this.gameWidth - this.width;
	}
}
