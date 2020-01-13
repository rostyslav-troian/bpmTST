if (typeof Ext !== "undefined") {
	requirejs.config({
		paths: {
			'configuration-loader': Terrasoft.workspaceBaseUrl + '/core/hash/Terrasoft/amd/configuration-loader',
			'configuration-bootstraps': Terrasoft.workspaceBaseUrl +
				'/core/hash/Terrasoft/amd/configuration-bootstraps',
			'require-config': Terrasoft.workspaceBaseUrl + '/core/hash/Terrasoft/amd/require-config',
			'require-url-config': Terrasoft.workspaceBaseUrl + '/core/hash/Terrasoft/amd/require-url-config',
			'core-base': Terrasoft.workspaceBaseUrl + '/core/hash/Terrasoft/amd/core-base',
			'bootstrap': Terrasoft.workspaceBaseUrl + '/core/hash/Terrasoft/amd/bootstrap',
			'performanceLogger': Terrasoft.workspaceBaseUrl + '/core/hash/Terrasoft/amd/performanceLogger',
			'performancecountermanager': Terrasoft.workspaceBaseUrl +
				'/core/hash/Terrasoft/amd/performancecountermanager',
			'loadbootstrap': Terrasoft.workspaceBaseUrl + '/core/hash/Terrasoft/amd/bootstrap.configuration',
			'jQuery': Terrasoft.workspaceBaseUrl + '/core/hash/jQuery/jQuery',
			'jQuery-easing': Terrasoft.workspaceBaseUrl + '/core/hash/jQueryEasing/jQuery-easing',
			'jsrender': Terrasoft.workspaceBaseUrl + '/core/hash/jsrender/jsrender',
			'ts-common-all': Terrasoft.workspaceBaseUrl + '/core/hash/ts-diagram-module/min/ts-common-all',
			'ts-diagram': Terrasoft.workspaceBaseUrl + '/core/hash/ts-diagram-module/min/ts-diagram',
			'process-schema-diagram': Terrasoft.workspaceBaseUrl +
				'/core/hash/Terrasoft/designers/process-schema-designer/process-schema-diagram',
			'process-schema-diagram-5x': Terrasoft.workspaceBaseUrl +
				'/core/hash/Terrasoft/designers/process-schema-designer/process-schema-diagram-5x',
			'ckeditor-base': Terrasoft.workspaceBaseUrl + '/core/hash/CKEditor/ckeditor',
			'html2canvas': Terrasoft.workspaceBaseUrl + '/core/hash/html2canvas/html2canvas'
		},
		shim: {
			'jQuery-easing': {'deps': ['jQuery']},
			'ts-common-all': {'deps': ['jQuery-easing']},
			'ts-diagram': {'deps': ['ts-common-all', 'jsrender']},
			'process-schema-diagram': {'deps': ['ts-diagram']},
			'process-schema-diagram-5x': {'deps': ['process-schema-diagram']}
		}
	});
	define("ext-base",
		[],
		function() {
			return Ext;
		});
	define("core-modules",
		[],
		function() {
			return false;
		});
	define("extjs-temporary-fixes",
		[],
		function() {
			return false;
		});
	define("base-module",
		[],
		function() {
			return false;
		});

	require(["core-modules", "core-base", "ext-base", "extjs-temporary-fixes", "require-config"],
		function(coreModules, core, Ext) {
			const configurationModulesConfig = {
				"applicationinstall-module": {
					path: Terrasoft.coreModulesPath + "Terrasoft/configuration/applicationinstall",
					less: ["applicationinstall"]
				},
				"ApplicationInstallViewModel": {
					"path": Terrasoft.coreModulesPath + "Terrasoft/configuration/applicationinstall",
					"deps": [
						"base-view-model", "ext-base", "sysenums", "messagebox", "base-core-request", "commonutils",
						"domutils",
						"ApplicationInstallRequest"
					]
				},
				"ApplicationInstallViewGenerator": {
					"path": Terrasoft.coreModulesPath + "Terrasoft/configuration/applicationinstall",
					"deps": ["baseobject", "button", "imageurlbuilder", "container", "label", "hyperlink"]
				},
				"ApplicationInstallRequest": {
					"path": Terrasoft.coreModulesPath + "Terrasoft/configuration/applicationinstall",
					"deps": ["base-core-request"]
				}
			};
			const requireBaseUrl = Terrasoft.workspaceBaseUrl;
			core.init(coreModules, configurationModulesConfig, requireBaseUrl);
			core.setModuleDescriptors(configurationModulesConfig);
			core.loadModule("applicationinstall-module",
				{
					renderTo: Ext.getBody()
				});
		});
} else {
	requirejs.config({
		paths: {
			"ext-base": "../../ExtJs/extjs-base-debug",
			"extjs-temporary-fixes": "../../ExtJs/extjs-temporary-fixes",
			"fileapi": "../../FileApi/FileAPI.min"
		},
		shim: {
			"ext-base": {
				exports: "Ext"
			},
			"extjs-temporary-fixes": {
				deps: ["ext-base"]
			},
			"fileapi": {
				exports: "fileapi"
			},
			"configuration-modules-object": {
				deps: ["core-modules-object"]
			}
		}
	});

	require(["core-modules", "core-base", "ext-base", "extjs-temporary-fixes", "configuration-modules-object",
			"require-config"],
		function(coreModules, core, Ext) {
			var configurationModulesConfig = {
				"applicationinstall-module": {
					"path": Terrasoft.coreModulesPath + "Terrasoft/configuration/applicationinstall",
					"less": ["applicationinstall"]
				}
			};
			var requireBaseUrl = Terrasoft.workspaceBaseUrl;
			core.init(coreModules, configurationModulesConfig, requireBaseUrl);
			core.setModuleDescriptors(configurationModulesConfig);
			core.loadModule("applicationinstall-module", {
				renderTo: Ext.getBody()
			});
		});
}
