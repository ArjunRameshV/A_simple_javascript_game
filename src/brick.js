import { detectCollision } from '/src/collision_detection';

export default class Brick {
	constructor(game, position) {
		this.image = document.getElementById('brick_ball');

		this.game = game;

		this.position = position;
		this.width = 80;
		this.height = 24;

		this.markForDel = false;
	}

	update() {
		//if collision happens with a ball

		if (detectCollision(this.game.ball, this)) {
			this.game.ball.speed.y = -this.game.ball.speed.y;
			//indicating the brick has to be removed in the game
			this.markForDel = true;
		}
	}

	draw(ctx) {
		ctx.drawImage(
			this.image,
			this.position.x,
			this.position.y,
			this.width,
			this.height
		);
	}
}
