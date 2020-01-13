define("CompletenessPageV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		CompletenessPageCaption: "{0}: data entry compliance",
		ConfirmSaveMessage: "Data entry compliance will be recalculated for the existing records after saving. Continue?",
		TotalPercentageNotCorrectMessage: "Data population percentage is not 100%. Change the setting",
		ScaleCaption: "Scale",
		ScaleWarning: "Enter the scale value",
		ScaleBoundMoreLessWarning: "Value cannot be less than {0}",
		ScaleBoundMoreGreaterWarning: "Value cannot be more than {0}",
		ScaleBoundMoreLessZeroMessage: "The value cannot be less than 0"
	};
	var localizableImages = {
		TagButtonIcon: {
			source: 3,
			params: {
				schemaName: "CompletenessPageV2",
				resourceItemName: "TagButtonIcon",
				hash: "f2077670f82cc27d32bfc24e727e430c",
				resourceItemExtension: ".png"
			}
		},
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "CompletenessPageV2",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "CompletenessPageV2",
				resourceItemName: "CloseButtonImage",
				hash: "511593df65946d88744783400c622cdb",
				resourceItemExtension: ".png"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "CompletenessPageV2",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "CompletenessPageV2",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		},
		ScaleIcon: {
			source: 3,
			params: {
				schemaName: "CompletenessPageV2",
				resourceItemName: "ScaleIcon",
				hash: "0554a8df2cd803c93a19be71bcbf842e",
				resourceItemExtension: ".png"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "CompletenessPageV2",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "CompletenessPageV2",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		OpenChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "CompletenessPageV2",
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