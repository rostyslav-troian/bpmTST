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
			"ext-base": "../../ExtJs/extjs5-base-debug"
		},

		shim: {
			"ext-base": {
				exports: "Ext"
			}
		}
	});
}

require(["core-modules", "core-modules.mobile", "core-base", "require-config"],
		function(coreModules, coreModulesMobile, core) {
	var baseUrl = "Resources";
	var configurationModulesConfig = {};
	coreModules = Ext.merge(coreModulesMobile, coreModules);
	core.init(coreModules, configurationModulesConfig, baseUrl);
	core.setModuleDescriptors({
		"loginModule.mobile": {
			"path": "Terrasoft/mobile",
			"css": ["loginModule.mobile"]
		}
	});
	core.loadModule("loginModule.mobile");
});