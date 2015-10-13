function init() {
	var canvas = document.getElementById('game_canvas');
	var ctx = canvas.getContext('2d');
	var background = new Image();
	background.onload = function(){
		ctx.drawImage(background, 0, 0, 600, 800);
		var spriteSheet = new Image();
		spriteSheet.onload = function(){
			ctx.drawImage(spriteSheet, 124, 114, 41, 31, 370, 100, 80, 80);
			ctx.drawImage(spriteSheet, 42, 117, 38, 30, 300, 100, 80, 60);
		};
		spriteSheet.src = 'duckhunt_various_sheet.png'
	};
	background.src = 'duckhunt-background.gif';
}
