Terrasoft.configuration.Structures["ColumnSettingsUtilities"] = {innerHierarchyStack: ["ColumnSettingsUtilities"]};
define("ColumnSettingsUtilities", function() {
	function openColumnSettings(sandbox, config, callback, renderTo, scope) {
		const columnSettingsId = sandbox.id + "_ColumnSettings";
		const loadModuleConfig = config && config.loadModuleConfig;
		const isNestedColumnSettingModule = loadModuleConfig && loadModuleConfig.isNestedColumnSettingModule;
		renderTo = loadModuleConfig && loadModuleConfig.columnSettingsContainerName || renderTo;
		const handler = function(args) {
			if (isNestedColumnSettingModule) {
				sandbox.unloadModule(columnSettingsId);
				const state = sandbox.publish("GetHistoryState");
				const hash = state && state.hash;
				sandbox.publish("ReplaceHistoryState", {
					stateObj: {
						moduleId: sandbox.id
					},
					hash: hash && hash.historyState,
					silent: true
				});
			}
			callback.call(scope, args);
		};
		sandbox.subscribe("ColumnSettingsInfo", function() {
			return config;
		}, [columnSettingsId]);
		if (!isNestedColumnSettingModule) {
			const params = sandbox.publish("GetHistoryState");
			sandbox.publish("PushHistoryState", {hash: params.hash.historyState});
		}
		sandbox.loadModule("ColumnSettings", {
			renderTo: renderTo,
			id: columnSettingsId,
			keepAlive: !Boolean(isNestedColumnSettingModule),
			instanceConfig: {
				isNestedColumnSettingModule: isNestedColumnSettingModule,
				hidePageCaption: loadModuleConfig && loadModuleConfig.hidePageCaption
			}
		});
		sandbox.subscribe("ColumnSetuped", handler, [columnSettingsId]);
	}

	return {
		Open: openColumnSettings
	};
});


