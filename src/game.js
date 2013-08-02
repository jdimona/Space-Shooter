var ss = ss || {};

ss.Game = {
	start: function() {
		ss.Config.init();
		Crafty.scene('Loading');
	}
};
