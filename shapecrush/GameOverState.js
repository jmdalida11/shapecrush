function GameOverState(gsm, canvas, score){

	this.gsm = gsm;
	this.canvas = canvas;
	this.score = score;
	
	this.init = function(){
		
	}
	
	this.render = function(context){
		
		context.drawImage(getImageRes('bg'), 0, 0, this.canvas.width, this.canvas.height);
		
		context.fillStyle = 'black';
		context.font = '24px verdana';
		context.fillText("Game Over! Your score is " + this.score,
						50 , 200);
		
	}
	
	this.update = function(){
		
	}
	
	this.mouseMove = function(pos){
		this.gsm.set(new PlayState(this.gsm, this.canvas));
	}


}