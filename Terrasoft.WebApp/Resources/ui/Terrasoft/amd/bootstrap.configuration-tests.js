(function() {
	var core = "../core/hash/";
	var amd = core + "Terrasoft/amd/";
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
				"require-config": amd + "require-config",
				"require-url-config": amd + "require-url-config",
				"core-modules": amd + "core-modules",
				"core-base": amd + "core-base",
				"configuration-modules": amd + "configuration-modules",
				"core-modules-object": amd + "core-modules-object",
				"bootstrap": amd + "bootstrap",
				"performancecountermanager": amd + "performancecountermanager",
				"ext-base": core + "ExtJs/extjs-base-debug",
				"configuration-loader": amd + "configuration-loader",
				"configuration-bootstraps": amd + "configuration-bootstraps"
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
			"ConfigurationEnvironment": "ConfigurationEnvironment",
			"siestacover": core + "requirejs/siestacoverconf",
			"siestaschemacover": core + "requirejs/siestaschemacover"
		}
	});

	function clearLessCss(coreModules) {
		for (var moduleName in coreModules) {
			if (!coreModules.hasOwnProperty(moduleName)) {
				continue;
			}
			var module = coreModules[moduleName];
			var file = module.file;
			if (file && (file.indexOf(".less") > 0)) {
				delete coreModules[moduleName];
			} else {
				delete module.less;
				delete module.css;
			}
		}
	}

	require(["ConfigurationEnvironment", "siestacover", "siestaschemacover"], function() {
		require(["core-modules", "configuration-loader"], function(coreModules, configurationLoader) {
			//clearLessCss(coreModules);
			configurationLoader.load("TestModuleWrapper");
		});
	});
})();
