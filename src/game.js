var ss = ss || {};

// hmm, combine config into this??
ss.Game = {
	start: function() {
		ss.Config.init();
		Crafty.scene('Loading');
	}
};
