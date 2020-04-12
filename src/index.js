import Game from '/src/game';

//is used to access the desired game area
let canvas = document.getElementById('gameScreen');
let ctx = canvas.getContext('2d');

//global game window parameters
const GAME_WIDTH = 800;
const GAME_HIEGHT = 600;

//our game object
let game = new Game(GAME_WIDTH, GAME_HIEGHT);

//a time variable to animate game
let lastTime = 0;

//to iterate the game and not have a single frame
function gameLoop(timestamp) {
	//we get timestamp from requestAnimateFrame
	//the change in time
	let dt = timestamp - lastTime;
	lastTime = timestamp;
	ctx.clearRect(0, 0, GAME_WIDTH, GAME_HIEGHT);
	//updating both the game variables for small time intervals
	game.update(dt);
	game.draw(ctx);

	requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
