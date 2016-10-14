function Game(){
	var mOldTime;
	var incTime;

	//camera
	var baseOffset;
	var offset;

	var mCanvas;
	var mCtx;
	var CanvasHeight;
	var CanvasWidth;
	var backgroundImg;
	var levelWidth;
	var levelHeight;
	var currentLevel = 0;

	var p1;

	var keys = [];

	//used to check how much time has passed between moves
	//used to keep movement on the 16*16 grid
	var moveTimer = 0;
	var moveTimerDefault = 50;

	this.init = function(){
		mCanvas = $("#myCanvas")[0];
		mCtx = mCanvas.getContext("2d");
		backgroundImg = $("#MenuScreen")[0];
		mCtx.font = '40pt Calibri';
		canvasWidth = parseInt(mCanvas.width);  
        canvasHeight = parseInt(mCanvas.height); 
        levelWidth = new Array(4000, 5000);
        levelHeight = new Array(1280, 1920);
        p1 = new Player();
        p1.createPlayer(32,32);
        baseOffset = p1.getInitialPos();
		offset = baseOffset;
        mOldTime = new Date();
        window.addEventListener('keydown',handleKeyDown,true);   
        window.addEventListener('keyup',handleKeyUp,true); 
	}

	this.update = function(){
		calcIncTime();
		handleTimers();
		controls();
		gameUpdate();	
	}

	function countdownTimer(timer, inc){
		timer -= incTime;
		if(timer < 0)
			timer = 0;
		return timer;
	}

	function handleTimers(){
		if (moveTimer > 0)
			moveTimer = countdownTimer(moveTimer, incTime);
	}

	function gameUpdate(){
		//get offset for camera coordinates based on player position
		for(var i = 0; i < 2; i++){
			offset[i] = p1.getPosition(i);
			if(offset[i] < baseOffset[i])
				offset[i] = baseOffset[i];
		}
		mCtx.save();
		//clear the canvas of all drawings
		mCtx.clearRect(0, 0, canvasWidth, canvasHeight);

		//translate camera if required
		if(offset[0] > canvasWidth / 2 + 1)
			mCtx.translate(-(offset[0] - canvasWidth/2), 0);
		if(offset[1] > canvasHeight / 2 + 1)
			mCtx.translate(0, -(offset[1] - canvasHeight/2));
		//draw background image
		mCtx.drawImage(backgroundImg,0,0,backgroundImg.width, backgroundImg.height);

		p1.draw(mCtx);
		mCtx.restore();
	}

	function calcIncTime(){
		var now = new Date();
		incTime = now - mOldTime;
		mOldTime = now;
	}

	//an array is set up that tracks every key the user types
	function handleKeyDown(evt){  
        keys[evt.keyCode] = true;  
    }  
    function handleKeyUp(evt){  
        keys[evt.keyCode] = false;  
    }        
    // disable vertical and horizontal scrolling from arrows to allow them to move player in game  
	$(document).keydown(function(e) {
		var ar=new Array(33,34,35,36,37,38,39,40);
     	var key = e.which;
     	if($.inArray(key,ar) > -1) {
       	   e.preventDefault();   	
       	}
	});

	function controls(){
		if ((keys[37] || keys[65]) && moveTimer == 0) { //left arrow or a
			p1.moveLR(-1);
			moveTimer = moveTimerDefault;
		}
        else if ((keys[39] || keys[68]) && moveTimer == 0) { //right arrow or d
			p1.moveLR(1);
			moveTimer = moveTimerDefault;
		}
		if ((keys[83] || keys[40]) && moveTimer == 0) {//left arrow or s
			p1.moveUD(1);
			moveTimer = moveTimerDefault;
		}
		else if ((keys[38] || keys[87]) && moveTimer == 0) {//up arrow or w
			p1.moveUD(-1);
			moveTimer = moveTimerDefault;
		}
	}

	//global function. mainly for use in the player class after moving
	this.getLevelBounds = function(){
		var bounds = new Array(levelWidth[currentLevel], levelHeight[currentLevel]);
		return bounds; 
	}

}