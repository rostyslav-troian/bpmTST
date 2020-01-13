requirejs.config({
	paths: {
		"ext-base": "ExtJs/extjs-base-debug",
		"json-applier-differ-mock": "Terrasoft/utils/common/tests/json-applier-differ-mock",
		"data-manager-item-mock": "Terrasoft/manager/data-manager/tests/data-manager-item-mock",
		"schema-manager-data-provider-mock": "Terrasoft/manager/tests/schema-manager-data-provider-mock",
		"data-manager-methods-mock": "Terrasoft/manager/data-manager/tests/data-manager-methods-mock",
		"service-provider-mock": "Terrasoft/core/service-provider-mock",
		"process-module-utilities-mock": "Terrasoft/designers/process-schema-designer/tests/process-module-utilities-mock"
	},
	shim: {
		"ext-base": {
			exports: "Ext"
		},
		"data-manager-item-mock": {
			"deps": ["json", "base-view-model", "data-manager-item"]
		},
		"schema-manager-data-provider-mock": {
			"deps": ["schema-manager-data-provider", "entity-schema", "entity-schema-request"]
		},
		"data-manager-methods-mock": {
			"deps": ["data-manager-item-mock", "core-resources"]
		},
		"service-provider-mock": {
			"deps": ["service-provider"]
		},
		"process-module-utilities-mock": {
			"deps": ["ext-base"]
		}
	}
});

(function(global) {
	var baseUrl = "../";
	global.Bootstrap.init(global.CoreModules, baseUrl);
	require(["ext-base", "extjs5-compatibility", "baseobject"], function(Ext) {
		Ext.Component = Terrasoft.BaseObject;
	});
})(this);