define("configuration-loader", ["core-modules", "core-base", "require-config"], function(coreModules, core) {
	function _loadConfigurationBootstraps(callback) {
		if (Terrasoft.usePackageFileContent) {
			require(["configuration-bootstraps"], callback);
		} else {
			Ext.callback(callback);
		}
	}

	function _loadConfiguration(configurationModuleName) {
		var forceSetModuleDescriptors = Terrasoft && Terrasoft.useStaticFileContent && Terrasoft.useGenerateModulePathes;
		core.setModuleDescriptors(Terrasoft.configuration.RootSchemaDescriptors, forceSetModuleDescriptors);
		_loadConfigurationBootstraps(function() {
			core.loadModule(configurationModuleName);
		});
	}

	return {
		load: function(configurationModuleName) {
			var configurationModulesConfig = {};
			var requireBaseUrl = Terrasoft.workspaceBaseUrl;
			core.init(coreModules, configurationModulesConfig, requireBaseUrl);
			var modulesToLoad = [];
			if (Terrasoft.useStaticFileContent) {
				if (Terrasoft.useGenerateModulePathes) {
					modulesToLoad.push("_ModulePathes");
				}
				modulesToLoad.push("_ResourceRoutes", "_ModuleDescriptors", "_ContentBootstrap");
			}
			if (Terrasoft.usePackageFileContent) {
				modulesToLoad.push("terrasoft");
				if (Terrasoft.fileContentDescriptorsFileExists) {
					modulesToLoad.push("_FileContentDescriptors");
				}
				if (Terrasoft.fileContentBootstrapsFileExists) {
					modulesToLoad.push("_FileContentBootstraps");
				}
			}
			if (modulesToLoad.length > 0) {
				require(modulesToLoad, function() {
					_loadConfiguration(configurationModuleName);
				});
			} else {
				_loadConfiguration(configurationModuleName);
			}
		}
	};
});
