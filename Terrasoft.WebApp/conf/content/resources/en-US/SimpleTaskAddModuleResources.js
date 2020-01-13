define("SimpleTaskAddModuleResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ModifyTaskCaption: "Edit activity",
		SaveButtonCaption: "Save",
		CancelButtonCaption: "Cancel",
		ModuleCaptionTemplate: "{0}{1}-{2}{3}",
		ShortDayStringTemplate: " {0}, {1} ",
		InProgress: "In progress",
		Finished: "Completed",
		NotStarted: "Not started",
		Canceled: "Canceled",
		SetAs: "Mark as \u0022{0}\u0022",
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