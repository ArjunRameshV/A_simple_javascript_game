export function detectCollision(ball, gameObj) {
	//to check collisions (with the paddle)
	let bottomOfBall = ball.position.y + ball.size;
	let topOfBall = ball.position.y;

	let gameObjTop = gameObj.position.y;
	let gameObjLeft = gameObj.position.x;
	let gameObjRight = gameObj.position.x + gameObj.width;
	let gameObjectBottom = gameObj.position.y + gameObj.height;
	if (
		bottomOfBall >= gameObjTop &&
		topOfBall <= gameObjectBottom &&
		ball.position.x + ball.size <= gameObjRight &&
		ball.position.x >= gameObjLeft
	) {
		return true;
	} else {
		return false;
	}
}
