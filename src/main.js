var game;

function showStartScreen(){
	console.log("HELLO");
	mCanvas = $("#myCanvas")[0];
	mCtx = mCanvas.getContext("2d");
	canvasWidth = parseInt(mCanvas.width);  
    canvasHeight = parseInt(mCanvas.height);
    backgroundImg = $("#MenuScreen")[0];
	mCtx.drawImage(backgroundImg,0,0,canvasWidth, canvasHeight);
	backgroundImg.style.zIndex = -10;
    console.log("HELLO1");

    window.addEventListener('keydown',handleKeyDown,true);   
    window.addEventListener('keyup',handleKeyUp,true); 

    var incT = 0, oldT = 0, tSLC = 0,checkTime = 5000;
    var menuKeys = [];

    //an array is set up that tracks every key the user types
	function handleKeyDown(evt){  
        menuKeys[evt.keyCode] = true;  
    }  
    function handleKeyUp(evt){  
        menuKeys[evt.keyCode] = false;  
    }        
    // disable vertical and horizontal scrolling from arrows to allow them to move player in game  
    $(document).keydown(function(e) {
		var ar=new Array(33,34,35,36,37,38,39,40);
     	var key = e.which;
     	if($.inArray(key,ar) > -1) {
       	   e.preventDefault();	
       	}
	}); 
	var menuInterval = setInterval(update, 30/1000);

	function update(){
		mCtx.clearRect(0,0,canvasWidth, canvasHeight);
		mCtx.drawImage(backgroundImg,0,0,canvasWidth, canvasHeight);
		mCtx.strokeStyle = "red";

		if(menuKeys[13]){ //enter pressed
			clearInterval(menuInterval);
			game = new Game();
			game.init();
			var int = setInterval(game.update, 30/1000);
		}
	}

	function calcIncTime(){
		var now = new Date();
		incT = now - oldT;
		oldT = now;
	}
}