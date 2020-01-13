if (typeof Ext !== "undefined") {
	define("ext-base", [], function() {
		return Ext;
	});
	define("core-modules", [], function() {
		return false;
	});
} else {
	requirejs.config({
		paths: {
			"ext-base": "../../ExtJs/extjs-base-debug",
			"configuration-bootstraps": Terrasoft.coreModulesPath + "Terrasoft/amd/configuration-bootstraps"
		},
		shim: {
			"ext-base": {
				exports: "Ext"
			}
		}
	});
}
requirejs.config({
	paths: {
		"vue": Terrasoft.coreModulesPath + "Terrasoft/vue/vue",
		"vue-components": Terrasoft.coreModulesPath + "dist/vue-components"
	}
});
require(["configuration-loader"], function(configurationLoader) {
	configurationLoader.load("ViewModuleWrapper");
});
