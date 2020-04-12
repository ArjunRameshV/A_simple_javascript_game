// to manage the game function
import Paddle from '/src/paddle';
import InputHandler from '/src/input';
import Ball from '/src/ball';

import { buildLevel, level1, level2 } from '/src/levels';

const GAMESTATES = {
	PAUSED: 0,
	RUNNING: 1,
	MENU: 2,
	GAMEOVER: 3,
	NEWLEVEL: 4
};

export default class Game {
	constructor(gameWidth, gameHeight) {
		this.gameWidth = gameWidth;
		this.gameHeight = gameHeight;
		//set the game state as menu
		this.gameState = GAMESTATES.MENU;
		//the different game objects
		this.gameObjs = [];
		//the paddle object(imported)
		this.paddle = new Paddle(this);
		//the ball object(imported)
		this.ball = new Ball(this);
		//the lives we get in the game
		this.lives = 3;
		//to deal with the bricks
		this.bricks = [];
		//to deal with the different game levels
		this.levels = [level1, level2];
		this.currentLevel = 0;
		//the function line that takes allows user interaction
		new InputHandler(this.paddle, this);
	}

	start() {
		//the function stops unless its the menu or you currently cleared a level
		if (
			this.gameState !== GAMESTATES.MENU &&
			this.gameState !== GAMESTATES.NEWLEVEL
		)
			return;
		//the brick objcts
		this.bricks = buildLevel(this, this.levels[this.currentLevel]);

		//all the game objects
		this.gameObjs = [this.paddle, this.ball];
		//reset the ball, incase of new level
		this.ball.reset();
		//have the state made to START
		this.gameState = GAMESTATES.RUNNING;
	}

	update(dt) {
		if (this.lives === 0) this.gameState = GAMESTATES.GAMEOVER;

		//we can pause the game by making sure that no updates happen !!!
		if (
			this.gameState === GAMESTATES.PAUSED ||
			this.gameState === GAMESTATES.MENU ||
			this.gameState === GAMESTATES.GAMEOVER
		)
			return;

		//to check if all the bricks are gone, then load next level
		if (this.bricks.length === 0) {
			this.currentLevel++;
			this.gameState = GAMESTATES.NEWLEVEL;
			this.start();
		}

		//updating the paddle and ball in small time intervals
		// this.paddle.update(dt);
		// this.ball.update(dt);+ others are represented as this.gameObj.update(dt)
		[...this.gameObjs, ...this.bricks].forEach(object => object.update(dt));

		this.bricks = this.bricks.filter(object => !object.markForDel);
	}

	draw(ctx) {
		//drawing the paddle and ball
		// this.paddle.draw(ctx);
		// this.ball.draw(ctx);+ others are represented as
		[...this.gameObjs, ...this.bricks].forEach(object => object.draw(ctx));

		//adds a transparent layer when paused
		if (this.gameState === GAMESTATES.PAUSED) {
			ctx.rect(0, 0, this.gameWidth, this.gameHeight);
			ctx.fillStyle = 'rgba(0,0,0,0.5)';
			ctx.fill();
			//Pause message
			ctx.font = '30px Arial';
			ctx.fillStyle = 'white';
			ctx.textAlign = 'center';
			ctx.fillText('Paused', this.gameWidth / 2, this.gameHeight / 2);
		}

		//a text bar for when the game is in MENU state
		if (this.gameState === GAMESTATES.MENU) {
			ctx.rect(0, 0, this.gameWidth, this.gameHeight);
			ctx.fillStyle = 'rgba(0,0,0,1)';
			ctx.fill();
			//Menu message
			ctx.font = '30px Arial';
			ctx.fillStyle = 'white';
			ctx.textAlign = 'center';
			ctx.fillText(
				'Press SPACEBAR to start',
				this.gameWidth / 2,
				this.gameHeight / 2
			);
		}

		//a text bar for when the game is OVER
		if (this.gameState === GAMESTATES.GAMEOVER) {
			ctx.rect(0, 0, this.gameWidth, this.gameHeight);
			ctx.fillStyle = 'rgba(0,0,0,1)';
			ctx.fill();
			//Game Over message
			ctx.font = '30px Arial';
			ctx.fillStyle = 'white';
			ctx.textAlign = 'center';
			ctx.fillText('GAME OVER !!!', this.gameWidth / 2, this.gameHeight / 2);
		}
	}

	//to decide the stage of the game
	togglePause() {
		if (this.gameState === GAMESTATES.PAUSED) {
			this.gameState = GAMESTATES.RUNNING;
		} else {
			this.gameState = GAMESTATES.PAUSED;
		}
	}
}
