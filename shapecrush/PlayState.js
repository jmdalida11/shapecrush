function PlayState(gsm, canvas){
	
	this.gsm = gsm;
	this.tiles = [];
	var selected = null;
	var toDelete = [];
	
	this.canvas = canvas;
	
	const offsetHUD = canvas.width * 0.2;
	
	
	PlayState.NUM_TILES = 8;
	PlayState.TILE_WIDTH = (canvas.width - offsetHUD) / PlayState.NUM_TILES;
	PlayState.TILE_HEIGHT = canvas.height / PlayState.NUM_TILES; 
	
	this.life;
	this.score = 0;
	this.speed = 0.5;
	this.speedTimer = 0;

	var toShapeDeleteAnimate = [];
	
	this.init = function(){
		for(var i=0; i<PlayState.NUM_TILES; i++){
			var tempTiles = [];
			for(var j=0; j<PlayState.NUM_TILES; j++){
				tempTiles.push(new Tile(j * PlayState.TILE_WIDTH, i * PlayState.TILE_HEIGHT, 
										PlayState.TILE_WIDTH, PlayState.TILE_HEIGHT));
			}
			this.tiles.push(tempTiles);
		}
		this.addNeighbor();
		this.check();
		haveMatch = false;
		this.life = canvas.height;
		this.score = 0;
	}
	
	this.addNeighbor = function(){
		
		for(var i=0; i<this.tiles.length; i++){
			for(var j=0; j<this.tiles[0].length; j++){
				
				if(i > 0){
					this.tiles[i][j].addNeighbor(this.tiles[i-1][j]); 
				}
				
				if(i < PlayState.NUM_TILES-1){
					this.tiles[i][j].addNeighbor(this.tiles[i+1][j]); 
				}
				
				if(j > 0){
					this.tiles[i][j].addNeighbor(this.tiles[i][j-1]); 
				}
				
				if(j < PlayState.NUM_TILES-1){
					this.tiles[i][j].addNeighbor(this.tiles[i][j+1]); 
				}
				
			}
		}
	}
		
	this.update = function(){
		this.speedTimer++;
		if(this.life <= 0){
			this.gsm.set(new GameOverState(this.gsm, this.canvas, this.score));
		}
		var tileNoShape = false;
		for(var i=0; i<this.tiles.length; i++){
			for(var j=0; j<this.tiles[0].length; j++){
				this.tiles[i][j].update();
				if(this.tiles[i][j].shape == null){
					this.tiles[i][j].createShape();
					tileNoShape = true;
				}
			}
		}
		
		if(tileNoShape){
			this.check();
		}
		
		this.life -= this.speed;
		if(this.speedTimer >= 1000){
			this.speed += 0.5;
			this.speedTimer = 0;
		}
		
	}
	
	this.render = function(context){
		
		
		context.fillStyle = 'lightgreen';
		if(this.life < canvas.height / 4){
			context.fillStyle = 'darkorange';
		}else if(this.life < canvas.height / 2){
			context.fillStyle = 'orange';
		}
	
		context.fillRect(PlayState.NUM_TILES * PlayState.TILE_HEIGHT,
							canvas.height - this.life, offsetHUD, this.life);
							
		context.fillStyle = 'black';
		context.font = '12px verdana';
		context.fillText("Score: " + this.score, canvas.width - offsetHUD + offsetHUD * 0.15, canvas.height - 50);
		
		for(var i=0; i<this.tiles.length; i++){
			for(var j=0; j<this.tiles[0].length; j++){
				if(this.tiles[i][j].shape != null){
						this.tiles[i][j].shape.render(context);
				}
			}
		}
		this.deletedShapeAnimate(context);
		if(selected != null){
			context.drawImage(getImageRes('Tile'), selected.x,selected.y,selected.w,selected.h);
		}
	}
	
	this.mouseMove = function(pos){
		
	
		for(var i=0; i<this.tiles.length; i++){
			for(var j=0; j<this.tiles[0].length; j++){
				if(this.tiles[i][j].isCollide(pos) && this.tiles[i][j].shape != null){
					this.move(i, j);
				}
			}
		}
	}
	
	this.move = function(i, j){
		
		if(selected == null){
			selected = this.tiles[i][j];
			return;
		}
		
		if(!selected.isNeighbor(this.tiles[i][j]) && selected != this.tiles[i][j]){
			return;
		}
		
		this.swap(selected, i, j);
		var swapBack = this.check();
		
		if(swapBack){
			this.swap(selected, i, j);
		}
		selected = null;
	}
	
	this.swap = function(selected, i, j){
		var tempShape = selected.shape;
		var tempShape2 = {x : this.tiles[i][j].shape.x, y:this.tiles[i][j].shape.y};
		selected.shape = this.tiles[i][j].shape;
		selected.shape.x = tempShape.x, selected.shape.y = tempShape.y;
		this.tiles[i][j].shape = tempShape;
		this.tiles[i][j].shape.x = tempShape2.x, this.tiles[i][j].shape.y = tempShape2.y;
	}
	
	this.check = function(){
		for(var j=this.tiles[0].length-1; j>=0; j--){
			for(var i=this.tiles.length-1; i>=0; i--){	
				this.checkLine(i, j);
			}
		}
		var haveToDeleteShapeReturn = toDelete.length == 0;
		this.removeShape(toDelete);
		return haveToDeleteShapeReturn;
	}	
	
	this.checkLine = function(i, j){
		var horizontal = [];
		var vertical = [];
		var x = 1;
		var tileLeft = true, tileTop = true, tileBot = true, tileRight = true;
		while(tileLeft || tileBot || tileRight || tileTop){
			
			if(i + x < PlayState.NUM_TILES){
				if(this.tiles[i+x][j].shape != null && tileRight && this.tiles[i][j].shape != null){
					if(this.tiles[i][j].shape.sides == this.tiles[i+x][j].shape.sides){
						horizontal.push(this.tiles[i+x][j]);
					}else{
						tileRight = false;
					}
				}else{
					tileRight = false;
				}
			}else{
				tileRight = false;
			}
			
			if(i - x >= 0){
				if(this.tiles[i-x][j].shape != null && tileLeft && this.tiles[i][j].shape !=null){
					if(this.tiles[i][j].shape.sides == this.tiles[i-x][j].shape.sides){
						horizontal.push(this.tiles[i-x][j]);
					}else{
						tileLeft = false;
					}
				}else{
					tileLeft = false;
				}
			}else{
				tileLeft = false;
			}
			
			if(j - x >= 0){
				if(this.tiles[i][j-x].shape != null && this.tiles[i][j].shape !=null && tileTop){
					if(this.tiles[i][j].shape.sides == this.tiles[i][j-x].shape.sides){
						vertical.push(this.tiles[i][j-x]);
					}else{
						tileTop = false;
					}
				}else{
					tileTop = false;
				}
			}else{
				tileTop = false;
			}
			
			if(j + x < PlayState.NUM_TILES){
				if(this.tiles[i][j+x].shape != null && tileBot && this.tiles[i][j].shape !=null){
					if(this.tiles[i][j].shape.sides == this.tiles[i][j+x].shape.sides){
						vertical.push(this.tiles[i][j+x]);
					}else{
						tileBot = false;
					}
				}else{
					tileBot = false;
				}
			}else{
				tileBot = false;
			}
			x++;
			if(x >= PlayState.NUM_TILES) break;
		}
		
		horizontal.push(this.tiles[i][j]);
		vertical.push(this.tiles[i][j]);
		if(horizontal.length >= 3){
			this.addToDelete(horizontal);
		}
		if(vertical.length >= 3){
			this.addToDelete(vertical);
		}
	}
	
	this.addToDelete = function(shapes){
		while(shapes.length > 0){
			var s = shapes.pop();
			toDelete.push(s);
			toShapeDeleteAnimate.push(s.shape);
		}
	}
	
	this.removeShape = function(shapes){
		while(shapes.length > 0){
			var s = shapes.pop();
			s.shape = null;
			this.AddLifeAndScore();
		}
	}
	
	this.AddLifeAndScore = function(){
		this.life += 2;
		this.score++;
		if(this.life > canvas.height){
			this.life = canvas.height;
		}
	}
	
	this.deletedShapeAnimate = function(context){
	
		for(var i=0; i<toShapeDeleteAnimate.length; i++){
			toShapeDeleteAnimate[i].startAnimation();
			toShapeDeleteAnimate[i].update();
			toShapeDeleteAnimate[i].render(context);
			if(toShapeDeleteAnimate[i].notVisible()){
				toShapeDeleteAnimate.pop();
				i--;
			}
		}
		
	}

	
}









