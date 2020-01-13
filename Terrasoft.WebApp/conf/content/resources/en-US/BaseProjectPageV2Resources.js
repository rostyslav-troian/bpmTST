define("BaseProjectPageV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		GeneralInfoTabCaption: "General information",
		LinksControlGroupCaption: "Connected to",
		StructureTabCaption: "Structure",
		MinuteMask: "{0} min",
		HourMask: "{0} h",
		StartDateGreaterDueDate: "The value in the \u0022Due\u0022 field should be greater than the value in the \u0022Start\u0022 field",
		BindToSelfWarningMessage: "An item cannot be bound to itself.",
		HistoryTabCaption: "History",
		DurationByMask: "Duration",
		EndDateLessStartDate: "Start date can not exceed the completion date",
		ContactAccountRequire: "Please, fill in either the \u0022Account\u0022 or \u0022Contact\u0022 field",
		ActualCompletionTip: "Percentage of project completion. This value is non-editable if the [Calculate automatically] checkbox is selected and is based on the [List of resources] detail",
		OwnerTip: "Full name of the record owner. Select the owner from the contacts registered as users in the system."
	};
	var localizableImages = {
		TagButtonIcon: {
			source: 3,
			params: {
				schemaName: "BaseProjectPageV2",
				resourceItemName: "TagButtonIcon",
				hash: "749c444773b4d39e64c4f6938fdf6d76",
				resourceItemExtension: ".svg"
			}
		},
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseProjectPageV2",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseProjectPageV2",
				resourceItemName: "CloseButtonImage",
				hash: "511593df65946d88744783400c622cdb",
				resourceItemExtension: ".png"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseProjectPageV2",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseProjectPageV2",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "BaseProjectPageV2",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "BaseProjectPageV2",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		OpenChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "BaseProjectPageV2",
				resourceItemName: "OpenChangeLogBtnImage",
				hash: "cbebcb32589828e1055caf62150ff717",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});