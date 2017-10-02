function Shape(x, y, w, h){
	
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	var types = [getImageRes('Triangle'), getImageRes('Diamond'), getImageRes('Polygon'), getImageRes('Trapyzoid')];

	this.totalAnimTime = 6;
	this.currentTime = 0;
	
	var r = getRandomShape();
	this.img = types[r];
	this.sides = 0;
	
	this.runningAnimate = false;
	
	if(r == 0){
		this.sides = 3;
	}else if(r == 1){
		this.sides = 4;
	}else if(r == 2){
		this.sides = 5;
	}else{
		this.sides = 6;
	}
	
	
	function getRandomShape(){
		
		var rand = getRandomNum(8);
		if(rand <= 1){
			return 0;
		}else if(rand <= 3){
			return 1;
		}else if(rand <= 5){
			return 2;
		}
		
		return 3;
	}
	
	
	function getRandomNum(x){
		return  Math.floor(Math.random() * x);
	}
	
	this.moveShape = function(pos){
		this.x = pos.x - this.w / 2;
		this.y = pos.y - this.h / 2;
	}

	
	this.update = function(){
		if(this.runningAnimate){
			this.shrinkImageAnimation();
		}
	}
	
	this.render = function(context){
		context.drawImage(this.img, this.x, this.y, this.w, this.h);
	}
	
	this.shrinkImageAnimation = function(){
		
			this.currentTime++;
			if(this.currentTime > this.totalAnimTime && this.w > 0 && this.h > 0){
				this.w -= 6;
				this.h -= 6;
				this.x -= 6;
				this.y -= 6;
				this.currentTime = 0;
			}
	}
	
	this.notVisible = function(){
		return this.w <=0 || this.h <=0;
	}
	
	this.startAnimation = function(){
		this.runningAnimate = true;
	}
	
}










