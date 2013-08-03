
// main game
Crafty.scene('Game', function() {
	var size = ss.Config.screenSize;
	var enmySize = ss.Config.enemySize;

	// setup player
	Crafty.e('Player');
	Crafty.e('Side').attr({x: 0, y: 0});
	Crafty.e('Side').attr({x: size - 1, y: 0});

	// setup wave 1
	Crafty.e('Enemy').at(enmySize, -(size * .5) - (enmySize * 2));
	Crafty.e('Enemy').at(enmySize * 3, -(size * .5) - (enmySize * 2));
	Crafty.e('Enemy').at(enmySize * 5, -(size * .5) - (enmySize * 2));
	Crafty.e('Enemy').at(enmySize * 7, -(size * .5) - (enmySize * 2));
	Crafty.e('Enemy').at(enmySize * 9, -(size * .5) - (enmySize * 2));
	Crafty.e('Enemy').at(enmySize * 11, -(size * .5) - (enmySize * 2));
	Crafty.e('Enemy').at(enmySize, -(size * .5) - (enmySize * 4));
	Crafty.e('Enemy').at(enmySize * 3, -(size * .5) - (enmySize * 4));
	Crafty.e('Enemy').at(enmySize * 5, -(size * .5) - (enmySize * 4));
	Crafty.e('Enemy').at(enmySize * 7, -(size * .5) - (enmySize * 4));
	Crafty.e('Enemy').at(enmySize * 9, -(size * .5) - (enmySize * 4));
	Crafty.e('Enemy').at(enmySize * 11, -(size * .5) - (enmySize * 4));
	Crafty.e('Enemy').at(enmySize, -(size * .5) - (enmySize * 6));
	Crafty.e('Enemy').at(enmySize * 3, -(size * .5) - (enmySize * 6));
	Crafty.e('Enemy').at(enmySize * 5, -(size * .5) - (enmySize * 6));
	Crafty.e('Enemy').at(enmySize * 7, -(size * .5) - (enmySize * 6));
	Crafty.e('Enemy').at(enmySize * 9, -(size * .5) - (enmySize * 6));
	Crafty.e('Enemy').at(enmySize * 11, -(size * .5) - (enmySize * 6));
});

// load game
Crafty.scene('Loading', function() {
	// display load screen to user
	Crafty.e('2D, DOM, Text')
		.text('Loading...');

	// load assets
	var assets = ['assets/ship5.png', 'assets/ship2.png', 'assets/bullet1.png', 'assets/bullet2.pnd'];
	Crafty.load(assets, function() {
		// setup game sprites
		Crafty.sprite(366, 304, 'assets/ship5.png', {spr_plrShip: [0, 0]});
		Crafty.sprite(426, 269, 'assets/ship2.png', {spr_enmyShip: [0, 0]});
		Crafty.sprite(34, 34, 'assets/bullet1.png', {spr_plrLaser: [0, 0]});
		Crafty.sprite(34, 34, 'assets/bullet2.png', {spr_enmyLaser: [0, 0]});
		Crafty.scene('Game');
	});
});
