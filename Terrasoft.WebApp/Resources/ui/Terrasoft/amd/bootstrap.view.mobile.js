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
			"ext-base": "../../ExtJs/extjs5-base-debug"
		},

		shim: {
			"ext-base": {
				exports: "Ext"
			}
		}
	});
}
// TODO: Remove after implementation of local schema saving
Terrasoft = window.Terrasoft || {};
Terrasoft.configuration = Terrasoft.configuration || {};
Terrasoft.configuration.RootSchemaDescriptors = {
	MobileSideBarModule: {path: "../../configuration/1b83b1c059c0c58b71a0375743438a19", "css": ["MobileSideBarModule"]},
	MobileViewModule: {path: "../../configuration/265d3b34b3438b2565c4af982014ba70", "css": ["MobileViewModule"]},
	MobileGridModule: {path: "../../configuration/5420db8c6d2c164a77b8f8a8fb6e45e2", "css": ["MobileGridModule"]}
};

require(["core-modules", "core-modules.mobile", "core-base"], function(coreModules, coreModulesMobile, core) {
	var setModuleDescriptor = core.setModuleDescriptor;
	core.setModuleDescriptor = function(moduleName, descriptor) {
		if (descriptor && descriptor.path) {
			descriptor.path = descriptor.path.replace("../../", Terrasoft.workspaceBaseUrl);
		}
		setModuleDescriptor(moduleName, descriptor);
	};
	core.setModuleDescriptors = function(moduleDescriptors) {
		for (var moduleName in moduleDescriptors) {
			if (moduleDescriptors.hasOwnProperty(moduleName)) {
				var moduleDescriptor = moduleDescriptors[moduleName];
				core.setModuleDescriptor(moduleName, moduleDescriptor);
			}
		}
	};
	var baseUrl = "Resources";
	var configurationModulesConfig = {};
	coreModules = Ext.merge(coreModulesMobile, coreModules);
	core.init(coreModules, configurationModulesConfig, baseUrl);
	requirejs.config({
		paths: {
			"profile": "requirejs/mobile-profile"
		}
	});
	require(["ext-base", "terrasoft", "db-executor"], function() {
		Terrasoft.DBExecutor.executeSql({
			sql: "select Value from MobileProfileData where Key = 'Authentication' limit 1",
			success: function(result) {
				var rows = result.rows;
				var data = rows.item(0);
				var authData = JSON.parse(data.Value);
				Terrasoft.workspaceBaseUrl = authData.ServerUrl + authData.Workspace.value + "/";
				core.setModuleDescriptors(Terrasoft.configuration.RootSchemaDescriptors);
				core.loadModule("MobileViewModule", {
					id: "MobileViewModuleId",
					renderTo: Ext.getBody()
				});
			},
			scope: this
		});
	});
});