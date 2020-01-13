define(["require-url-config"], function() {
	if (Terrasoft.useStaticFileContent) {
		requirejs.config({
			paths: {
				"_ResourceRoutes": "conf/content/resources/_ResourceRoutes",
				"_ModuleDescriptors": "conf/content/_ModuleDescriptors",
				"_ModulePathes": "conf/content/_ModulePathes",
				"_ContentBootstrap": "conf/content/_ContentBootstrap",
				"empty-resources": Terrasoft.coreModulesPath + "Terrasoft/configuration/resources/empty-resources"
			}
		});
	}
	if (Terrasoft.usePackageFileContent) {
		requirejs.config({
			paths: {
				"_FileContentDescriptors": "conf/content/_FileContentDescriptors",
				"_FileContentBootstraps": "conf/content/_FileContentBootstraps"
			}
		});
	}
	requirejs.config({
		urlArgs: function(id, url) {
			return Terrasoft.RequireUrlConfig.getUrlArgs(id, url);
		}
	});
});
