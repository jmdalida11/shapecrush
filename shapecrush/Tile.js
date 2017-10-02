function Tile(x, y, w, h){
	
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.img = getImageRes("Tile");
	this.shape = new Shape(x, y, w-1, h-1);
	
	this.neighbors = [];
	
	this.isNeighbor = function(t){
		return this.neighbors.includes(t);
	}
	
	this.addNeighbor = function(t){
		this.neighbors.push(t);
	}
	
	this.update = function(){
		if(this.shape != null){
			this.shape.update();
		}
	}
	
	
	this.render = function(context){
		context.drawImage(this.img, this.x, this.y, this.w, this.h);	
	}
	
		
	this.isCollide = function(pos){
		return (pos.x >= this.x && pos.x <= this.x + this.w && pos.y >= this.y && pos.y <= this.y + this.h);
	}
	
	this.setShape = function(shape){
		this.shape = shape;
	}
	
	this.createShape = function(){
		this.shape = new Shape(x, y, w-1, h-1);
	}
}





