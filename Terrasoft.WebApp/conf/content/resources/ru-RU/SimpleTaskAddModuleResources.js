define("SimpleTaskAddModuleResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ModifyTaskCaption: "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0430\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u044C",
		SaveButtonCaption: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",
		CancelButtonCaption: "\u041E\u0442\u043C\u0435\u043D\u0430",
		ModuleCaptionTemplate: "{0}{1}-{2}{3}",
		ShortDayStringTemplate: " {0}, {1} ",
		InProgress: "\u0412 \u0440\u0430\u0431\u043E\u0442\u0435",
		Finished: "\u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0430",
		NotStarted: "\u041D\u0435 \u043D\u0430\u0447\u0430\u0442\u0430",
		Canceled: "\u041E\u0442\u043C\u0435\u043D\u0435\u043D\u0430",
		SetAs: "\u041E\u0442\u043C\u0435\u0442\u0438\u0442\u044C \u043A\u0430\u043A \u0022{0}\u0022",
		ModuleMarker: "simple-task-add-module",
		ModuleInitializedMarker: "simple-task-add-module-initialized"
	};
	var localizableImages = {
		ModifyTaskIcon: {
			source: 3,
			params: {
				schemaName: "SimpleTaskAddModule",
				resourceItemName: "ModifyTaskIcon",
				hash: "b04316e3c3c4748b121b9d3aa79a1f62",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});