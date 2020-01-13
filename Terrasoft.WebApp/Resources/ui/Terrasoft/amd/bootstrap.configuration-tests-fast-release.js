define("ext-base", [], function() {return Ext;});
define("core-modules", [], function() {return false;});

requirejs.config({
	paths: {
		"ConfigurationEnvironment": "ConfigurationEnvironment",
		"siestacover": "../core/hash/requirejs/siestacoverconf",
		"siestaschemacover": "../core/hash/requirejs/siestaschemacover"
	}
});

require(["ConfigurationEnvironment", "siestacover", "siestaschemacover"], function() {
	require(["core-modules", "configuration-loader"], function(coreModules, configuration) {
		const fileNameParts = window.name.split("_");
		if (fileNameParts.length < 3) {
			throw new Error("Test file name has no package name");
		}
		Terrasoft.TestEnvironmentVariables.PackageName = fileNameParts[1];
		configuration.load("Test");
	});
});
