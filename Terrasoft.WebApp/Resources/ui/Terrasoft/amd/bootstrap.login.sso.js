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
			"ext-base": "../../ExtJs/extjs-base-debug"
		},
		shim: {
			"ext-base": {
				exports: "Ext"
			}
		}
	});
}

require(["core-modules", "core-base"], function(coreModules, core) {
	if (Ext.isDefined(Terrasoft.SsoUtils)) {
		Terrasoft.SsoUtils.initiateSsoLogin();
	} else {
		var configurationModulesConfig = {};
		var requireBaseUrl = Terrasoft.loaderBaseUrl;
		core.init(coreModules, configurationModulesConfig, requireBaseUrl);
		require(["ssoutils"], function() {
			Terrasoft.SsoUtils.initiateSsoLogin();
		});
	}
});
