Terrasoft.configuration.Structures["ConfigurationBootstrap"] = {innerHierarchyStack: ["ConfigurationBootstrap"]};
define("ConfigurationBootstrap", ["terrasoft", "BootstrapModules", "BootstrapModulesV2"],
	function(Terrasoft, bootstrapModules) {
	require(["SectionBundleModule"]);
	var modulesNames = [];
	Terrasoft.each(bootstrapModules, function() {
		var moduleName = arguments[1];
		modulesNames.push(moduleName);
	});
	require(modulesNames, function() {
		Terrasoft.each(arguments, function(module) {
			if (module && module.init) {
				module.init();
			}
		});
	});
});


