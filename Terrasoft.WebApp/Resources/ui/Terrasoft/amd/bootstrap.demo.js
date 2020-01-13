(function() {
	var baseUrl = "./Resources";
	requirejs.config({
		baseUrl: baseUrl,
		paths: {
			"core-modules": "Terrasoft/amd/core-modules",
			"core-base": "Terrasoft/amd/core-base",
			"configuration-modules": "Terrasoft/amd/configuration-modules",
			"core-modules-object": "Terrasoft/amd/core-modules-object",
			"bootstrap": "Terrasoft/amd/bootstrap",
			"performancecountermanager": "Terrasoft/amd/performancecountermanager",
			"ext-base": "ExtJs/extjs-base-debug",
			"fileapi": "FileApi/FileAPI.min"
		},
		shim: {
			"ext-base": {
				exports: "Ext"
			},
			"fileapi": {
				exports: "fileapi"
			},
			"requirejs/less-loader!Terrasoft/controls/sidebar/sidebar": {
				"deps": ["core-resources"]
			}
		}
	});
	require(["core-modules", "configuration-modules", "core-base"], function(coreModules, configurationModules, core) {
		core.init(coreModules, configurationModules, baseUrl);
		core.setModuleDescriptors(configurationModules);
		core.loadModule("demo-main");
	});
})();