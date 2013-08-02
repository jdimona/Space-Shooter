Crafty.c('Side', {
	init: function() {
		var scrSize = ss.Config.screenSize;

		this.requires('2D, Canvas, Solid')
			.attr({w: 1, h: scrSize})
	}
});

Crafty.c('Actor', {
	init: function() {
		this.requires('2D, Canvas');
	},

	at: function(x, y) {
		if (x === undefined && y === undefined) {
			return {x: this.x + (this.w * .5), y: this.y + (this.h * .5)};
		} else {
			this.attr({x: x - (this.w * .5), y: y - (this.h * .5)});
			return this;
		}
	}
});

Crafty.c('Player', {
	init: function() {
		this.health = 100;

		var scrSize = ss.Config.screenSize,
				plrSize = ss.Config.playerSize,
				plrSpeed = scrSize * .02;

		this.requires('Actor, Multiway, Collision, Controls, spr_plrShip')
			.attr({w: plrSize, h: plrSize})
			.multiway(plrSpeed, {RIGHT_ARROW: 0, LEFT_ARROW: 180})
			.at(scrSize * .5, scrSize - (plrSize * .6))
			.onHit('Side', this.stopMovement)
			.bind('KeyDown', this.keydown);
	},

	keydown: function(e) {
		if (e.keyCode === Crafty.keys.SPACE) {
			Crafty.e('PlayerLaser').at(this.x  + (this.w * .5), this.y);
		}
	},

	stopMovement: function() {
		this._speed = 0;
		if (this._movement) {
			this.x -= this._movement.x;
			this.y -= this._movement.y;
		}
	},

	takeDamage: function(damage) {
		console.log('here');
		this.health -= damage;
		if (this.health <= 0) {
			this.die();
		}
	},

	die: function() {
		this.destroy();
	}
});

Crafty.c('PlayerLaser', {
	init: function() {
		var lzrSize = ss.Config.laserSize;
		this.speed = ss.Config.playerLaserSpeed;
		this.damage = 30;

		this.requires('Actor, Collision, spr_plrLaser')
			.attr({w: lzrSize, h: lzrSize})
			.onHit('Enemy', this.causeDamage)
			.bind('EnterFrame', this.moveUp);
	},

	moveUp: function() {
		this.move('n', this.speed);
		if(this.y > Crafty.viewport.height || this.y < 0) 
    	this.destroy();
	},

	causeDamage: function(e) {
		for (var i = 0; i < e.length; i++) {
			e[i].obj.takeDamage(this.damage);
		}
		this.destroy();
	}
});

Crafty.c('DropDown', {
	init: function() {
		this.dropDist = ss.Config.screenSize;
		this.distDropped = 0;

		this.bind('EnterFrame', this.drop);
	},

	drop: function() {
		this.move('s', this.speed);
		this.distDropped += this.speed;
		if (this.distDropped >= this.dropDist) {
			this.finish();
		}
	},

	finish: function() {
		this.unbind('EnterFrame', this.drop);
		this.run();
	}
});

Crafty.c('SquarePath', {
	init: function() {
		this.pathSize = 0;
		this.distTraveled = 0;
		this.crntDir = 0;
		this.dirs = ['s', 'e', 'n', 'w'];
	},

	squarepath: function(size) {
		this.pathSize = size;
		return this;
	},

	run: function() {
		this.bind('EnterFrame', function() {
			this.move(this.dirs[this.crntDir], this.speed);
			this.distTraveled += this.speed;

			if (this.distTraveled >= this.pathSize) {
				this.crntDir = (this.crntDir + 1) % 4;
				this.distTraveled = 0;
			}
		});
	}
});

Crafty.c('EnemyLaser', {
	init: function() {
		var lzrSize = ss.Config.laserSize;
		this.speed = ss.Config.playerLaserSpeed;
		this.damage = 30;

		this.requires('Actor, Collision, spr_plrLaser')
			.attr({w: lzrSize, h: lzrSize})
			.onHit('Player', this.causeDamage)
			.bind('EnterFrame', this.moveDown);
	},

	moveDown: function() {
		this.move('s', this.speed);
		if(this.y > Crafty.viewport.height || this.y < 0) 
    	this.destroy();
	},

	causeDamage: function(e) {
		for (var i = 0; i < e.length; i++) {
			e[i].obj.takeDamage(this.damage);
		}
		this.destroy();
	}
});

Crafty.c('Enemy', {
	init: function() {
		var enmySize = ss.Config.enemySize;
		this.speed = ss.Config.enemySpeed;
		this.health = 100;

		this.requires('Actor, Collision, SquarePath, DropDown, spr_enmyShip')
			.attr({w: enmySize, h: enmySize})
			.squarepath(enmySize * 2)
			.bind('EnterFrame', this.shoot);
	},

	shoot: function(e) {
		var sparsity = Crafty.math.randomInt(100, 500);
		if(e.frame % sparsity == 0) {
			Crafty.e('EnemyLaser').at(this.x  + (this.w * .5), this.y + this.w);
		}
	},

	takeDamage: function(damage) {
		this.health -= damage;
		if (this.health <= 0) {
			this.die();
		}
	},

	die: function() {
		this.destroy();
	}
});
