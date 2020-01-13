define("ScoringRulePageV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		DurationValidationErrorMessage: "The value of the \u0022Effective for\u0022 field should be greater than 0",
		ScoringCountValidationErrorMessage: "The value of the \u0022Number of scorings\u0022 field should be greater than 0",
		ConditionsGroupCaption: "Condition for assigning points",
		ScoringCountGroupCaption: "How many times to apply?",
		PointsGroupCaption: "How many points to assign?",
		DurationGroupCaption: "How long points stay effective?",
		DurationInfiniteCaption: "Always",
		DurationLimitToCaption: "days",
		ScoringCountInfiniteCaption: "Apply every time",
		ScoringCountLimitToCaption: "Apply every time, but not more than",
		ScoringCountLimitToCaption2: "times",
		PointsCaption: "Number of points"
	};
	var localizableImages = {
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "ScoringRulePageV2",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "ScoringRulePageV2",
				resourceItemName: "CloseButtonImage",
				hash: "511593df65946d88744783400c622cdb",
				resourceItemExtension: ".png"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "ScoringRulePageV2",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "ScoringRulePageV2",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "ScoringRulePageV2",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "ScoringRulePageV2",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		OpenChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "ScoringRulePageV2",
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