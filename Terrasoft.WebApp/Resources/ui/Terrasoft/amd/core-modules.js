(function(global) {
	var define = global.define;
	if (define) {
		define(["core-modules-object"], function() {
			return coreModules;
		});
	} else {
		global.CoreModules = coreModules;
	}
})(this);