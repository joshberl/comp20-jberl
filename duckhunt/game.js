function init() {
	var canvas = document.getElementById('game_canvas');
	var ctx = canvas.getContext('2d');
	var background = new Image();
	background.onload = function(){
		ctx.drawImage(background, 0, 0);
	};
	background.src = 'duckhunt-background.gif';
	var spriteSheet = new Image();
	spriteSheet.src = 'duckhunt_various_sheet.png'
}
