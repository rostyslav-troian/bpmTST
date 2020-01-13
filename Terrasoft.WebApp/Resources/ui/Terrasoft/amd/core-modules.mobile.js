(function(global) {
	var define = global.define;
	if (define) {
		var checkIsNative = function() {
			var platform = location.search.toLowerCase();
			return (platform.indexOf('platform=browser') === -1);
		};

		var addPlugin = function(name, deps) {
			coreModules[name] = {
				"path": "Terrasoft/mobile/core/plugins/" + this.pluginDirectory,
				"deps": deps || [this.basePlugin]
			};
		};

		var addBasePlugin = function(basePlugin) {
			this.basePlugin = basePlugin;
			addPlugin(basePlugin, ["base-plugin"]);
		};

		define(["core-modules-object.mobile"], function() {
			var isNative = checkIsNative();
			if (isNative) {
				this.pluginDirectory = "native";
				addBasePlugin("base-native-plugin");
				addPlugin("plugin-execution-manager");
			} else {
				this.pluginDirectory = "browser";
				addBasePlugin("base-browser-plugin");
			}
			var plugins = ["sqlite-plugin", "application-info-plugin"];
			for (var i = 0, ln = plugins.length; i < ln; i++) {
				addPlugin(plugins[i]);
			}
			return coreModules;
		});
	} else {
		global.CoreModules = coreModules;
	}
})(this);