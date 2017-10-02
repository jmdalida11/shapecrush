function GSM(context){
	
	this.states = [];
	this.context = context;
	
	this.set = function(s){
		this.states.pop();
		this.states.push(s);
		this.init();
	}
	
	this.push = function(s){
		this.states.push(s);
		this.init();
	}
	
	this.pop = function(){
		this.states.pop();
	}
	
	this.init = function(){
		this.states[this.states.length-1].init();
	}
	
	this.update = function(){
		this.states[this.states.length-1].update();
	}
	
	this.render = function(context){
		this.states[this.states.length-1].render(this.context);
	}
	
	this.getCurrentState = function(){
		return this.states[this.states.length-1];
	}

}