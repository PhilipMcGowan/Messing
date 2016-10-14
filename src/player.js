function Player(){
	this.width;
	this.height;
	this.playerPosition;//array of ints
	this.playerInventory;//array of items

	var playerPos;

	this.createPlayer = function(width,height){
		this.width = width;
		this.height = height;
		playerPos = new Array(200,300);
	}

	this.draw = function(ctx){
		ctx.beginPath();
		ctx.rect(playerPos[0], playerPos[1], this.width, this.height);
		ctx.stroke();
		ctx.closePath();
	}

	this.moveLR = function(goingRight){
		playerPos[0] += goingRight;
	}

	this.moveUD = function(goingUp){
		playerPos[1] += goingUp;
	}

	this.getPosition = function(i){
		return playerPos[i];
	}

	this.getInitialPos = function(){
		return playerPos;
	}
	//this.use()
	//this.showInventory()
};