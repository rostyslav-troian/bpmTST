(function() {
	var emptyModuleUrl = "core/hash/Terrasoft/amd/empty-module";
	var moduleNames = [];
	var paths = {};
	Terrasoft.each(Terrasoft.configuration.FileContentBootstraps, function(fileContent, packageName) {
		Terrasoft.each(fileContent, function(moduleUrl) {
			var moduleName = packageName + "_bootstrap";
			moduleNames.push(moduleName);
			var urls = Terrasoft.isUrl(moduleUrl)
					? [Terrasoft.prepareUrlForRequireJs(moduleUrl), emptyModuleUrl]
					: [Terrasoft.getFileContentUrl(packageName, moduleUrl)];
			paths[moduleName] = urls;
		});
	});
	require.config({
		paths: paths
	});
	define("configuration-bootstraps", moduleNames);
}());