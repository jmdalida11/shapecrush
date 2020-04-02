
var imgs = {
	"Tile" : loadImage('tile.png'),
	"Triangle" : loadImage('triangle.png'),
	"Diamond" : loadImage('diamond.png'),
	"Polygon" : loadImage('polygon.png'),
	"Trapyzoid" : loadImage('trapyzoid.png'),
	"bg" : loadImage('bg.PNG')
};

function getImageRes(key){
	return imgs[key];
}

function loadImage(path){
	var img = new Image();
	img.src = path;
	return img;
}

