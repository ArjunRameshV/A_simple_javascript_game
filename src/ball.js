import { detectCollision } from '/src/collision_detection';

export default class Ball {
	constructor(game) {
		this.image = document.getElementById('img_ball');

		this.height = game.gameHeight;
		this.width = game.gameWidth;

		this.game = game;
		this.size = 16;
		this.reset();
	}

	reset() {
		this.speed = { x: 4, y: -2 };
		this.position = { x: 10, y: 400 };
	}

	draw(ctx) {
		ctx.drawImage(
			this.image,
			this.position.x,
			this.position.y,
			this.size,
			this.size
		);
	}

	update() {
		this.position.x += this.speed.x;
		this.position.y += this.speed.y;

		//to check if the ball hits the walls of the canvas
		if (this.position.x + this.size > this.width || this.position.x < 0) {
			//we need to rever the speed-x
			this.speed.x = -this.speed.x;
		}

		if (this.position.y < 0) {
			//we need to rever the speed-x
			this.speed.y = -this.speed.y;
		}

		//if the player misses the ball
		if (this.position.y + this.size > this.height) {
			this.game.lives--;
			this.reset();
		}

		//collision detection
		if (detectCollision(this, this.game.paddle)) {
			this.speed.y = -this.speed.y;
			this.position.y = this.game.paddle.position.y - this.size;
		}
	}
}
