function Player(){
	var width;
	var height;
	this.playerPosition;//array of ints
	this.playerInventory;//array of items

	var playerPos;

	this.createPlayer = function(w,h){
		width = w;
		height = h;
		playerPos = new Array(208,304);
	}

	this.draw = function(ctx){
		ctx.beginPath();
		ctx.rect(playerPos[0], playerPos[1], width, height);
		ctx.stroke();
		ctx.closePath();
	}	

	this.moveLR = function(goingRight){
		playerPos[0] += goingRight * 16;
		checkPlayerBounds();
	}

	this.moveUD = function(goingUp){
		playerPos[1] += goingUp * 16;
		checkPlayerBounds();
	}

	this.getPosition = function(i){
		return playerPos[i];
	}

	this.getInitialPos = function(){
		return playerPos;
	}

	this.getWidth = function(){
		return width;
	}

	function checkPlayerBounds() {
		var x = playerPos[0];
		var y = playerPos[1];
		var w = game.getLevelBounds();
		if(!(x > 0) || !(x + width < w[0])) {
			if(x < 0)
				playerPos[0] = 0;
			else if (x + width > w[0])
				playerPos[0] = w[0] - width;
		}
		else if(!(y > 0) || !(y + height) < w[1]){
			if(y < 0)
				playerPos[1] = 0;
			else if (y + height > w[1])
				playerPos[1] = w[1] - height;
		}	
		
	}

	//this.use()
	//this.showInventory()
};

//2 4 8 16 32 64 128 256 512 1024 2048 4096

//0 16 32 48 64 80 96 112 128 144 160 176 192 208 224 240 256 272 288 304 320 336 352 368 384 400