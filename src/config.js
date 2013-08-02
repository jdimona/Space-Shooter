var ss = ss || {};

ss.Config = {
	init: function() {
		this._setSize();
		Crafty.init(this.screenSize, this.screenSize);
		Crafty.background('black');
	},

	_setSize: function() {
		var width = window.innerWidth,
				height = window.innerHeight;

		this.screenSize = height < width ? height : width;
		this.playerSize = this.screenSize * .1;
		this.laserSize = this.playerSize * .2;
		this.playerLaserSpeed = this.screenSize * .02;
		this.playerSpeed = this.screenSize * .02;
		this.enemySize = this.playerSize * .8;
		this.enemySpeed = this.screenSize * .005;
	}
};