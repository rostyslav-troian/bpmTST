requirejs.config({
	paths: {
		"require-config": "../core/hash/Terrasoft/amd/require-config",
		"require-url-config": "../core/hash/Terrasoft/amd/require-url-config",
		"core-modules": "../core/hash/Terrasoft/amd/core-modules",
		"core-base": "../core/hash/Terrasoft/amd/core-base",
		"configuration-modules": "../core/hash/Terrasoft/amd/configuration-modules",
		"core-modules-object": "../core/hash/Terrasoft/amd/core-modules-object",
		"bootstrap": "../core/hash/Terrasoft/amd/bootstrap",
		"performancecountermanager": "../core/hash/Terrasoft/amd/performancecountermanager",
		"ext-base": "../core/hash/ExtJs/extjs-base-debug",
		"configuration-loader": "../core/hash/Terrasoft/amd/configuration-loader",
		"configuration-bootstraps": "../core/hash/Terrasoft/amd/configuration-bootstraps",
		"ConfigurationEnvironment": "ConfigurationEnvironment",
		"siestacover": "../core/hash/requirejs/siestacoverconf",
		"siestaschemacover": "../core/hash/requirejs/siestaschemacover"
	},
	shim: {
		"ext-base": {
			exports: "Ext"
		}
	}
});

require(["ConfigurationEnvironment", "siestacover", "siestaschemacover"], function() {
	require(["core-modules", "configuration-loader"], function(coreModules, configuration) {
		var fileNameParts = window.name.split("_");
		var packageName = fileNameParts[1];
		if (fileNameParts.length < 3) {
			throw new Error("File name has no package name");
		}
		Terrasoft.TestEnvironmentVariables.PackageName = packageName;
		configuration.load("Test");
	});
});
