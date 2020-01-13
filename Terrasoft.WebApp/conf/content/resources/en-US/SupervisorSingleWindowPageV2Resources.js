define("SupervisorSingleWindowPageV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ProcessSchemaUIdCaption: "Process",
		EntitySchemaUIdCaption: "Queue type",
		FillingTabCaption: "Queue population",
		FillingParametersGroupCaption: "Queue population type",
		UpdateQueuesTriggerError: "Unable to update queue planner task. Request status: {0}",
		TeamTabCaption: "Team",
		LookupPrefixCaption: "Select: ",
		QueueTypeCaption: "Queue type",
		IsAutoFillingQueueCaption: "Automatically by filter conditions",
		IsManuallyFillingQueueCaption: "Fill in manually",
		InvalidParametersMessage: "\u0022{0}\u0022 process is not suitable for processing the queue items. Check parameters availability or type of the process: {1}",
		ExecuteCheckProcessErrorMessage: "Process \u0022{0}\u0022 can\u0027t be used in the queue.  See Academy for details",
		ExecuteCheckProcessErrorDetailMessage: "Process \u0022{0}\u0022 can\u0027t be used in the queue. Error details: \u0022{1}\u0022.  See Academy for more details"
	};
	var localizableImages = {
		TagButtonIcon: {
			source: 3,
			params: {
				schemaName: "SupervisorSingleWindowPageV2",
				resourceItemName: "TagButtonIcon",
				hash: "749c444773b4d39e64c4f6938fdf6d76",
				resourceItemExtension: ".svg"
			}
		},
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "SupervisorSingleWindowPageV2",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "SupervisorSingleWindowPageV2",
				resourceItemName: "CloseButtonImage",
				hash: "511593df65946d88744783400c622cdb",
				resourceItemExtension: ".png"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "SupervisorSingleWindowPageV2",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "SupervisorSingleWindowPageV2",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "SupervisorSingleWindowPageV2",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "SupervisorSingleWindowPageV2",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		OpenChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "SupervisorSingleWindowPageV2",
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