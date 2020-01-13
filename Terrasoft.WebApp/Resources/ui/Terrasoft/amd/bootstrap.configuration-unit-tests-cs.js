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
			"require-config": "require-config",
			"require-url-config": "require-url-config",
			"core-modules": "core-modules",
			"configuration-modules": "configuration-modules",
			"core-modules-object": "core-modules-object",
			"bootstrap": "bootstrap",
			"performancecountermanager": "performancecountermanager",
			"ext-base": "../../ExtJs/extjs-base-debug"
		},
		shim: {
			"ext-base": {
				exports: "Ext"
			}
		}
	});
}

require(["core-modules", "core-base", "require-config"], function(coreModules, core) {
	var configurationModulesConfig = {};
	var requireBaseUrl = Terrasoft.workspaceBaseUrl;
	core.init(coreModules, configurationModulesConfig, requireBaseUrl);
	Terrasoft.configuration = Terrasoft.configuration || {};
	Terrasoft.configuration.RootSchemaDescriptors = {
		"test-status-enum": {
			"path": "core/hash/Terrasoft/UnitTests",
			"deps": ["sysenums"]
		},
		"test-view-model": {
			"path": "core/hash/Terrasoft/UnitTests",
			"deps": ["base-view-model"]
		},
		"unit-tests-cs-view-model": {
			"path": "core/hash/Terrasoft/UnitTests",
			"deps": ["base-view-model", "test-view-model", "test-status-enum"]
		},
		"unit-tests-cs-module": {
			"path": "core/hash/Terrasoft/UnitTests",
			"css": ["unit-tests-cs-module"],
			"deps": ["unit-tests-cs-view-model"]
		}
	};
	core.setModuleDescriptors(Terrasoft.configuration.RootSchemaDescriptors);
	core.loadModule("test-status-enum");
	core.loadModule("test-view-model");
	core.loadModule("unit-tests-cs-view-model");
	core.loadModule("unit-tests-cs-module");
});
