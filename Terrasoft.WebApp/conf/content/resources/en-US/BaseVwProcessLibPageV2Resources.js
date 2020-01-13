define("BaseVwProcessLibPageV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ShowExtendedPropertiesActionCaption: "Process setup",
		ShouldActivateProcessMessage: "Process is not activated. Activate process?",
		RunProcessActionCaption: "Run process",
		CancelRunningProcessesActionCaption: "Cancel running processes",
		CancelRunningProcessesConfirmationMessage: "{0} process instances will be canceled. Continue?",
		RunningProcessesTabCaption: "Launch options",
		AddToRunButtonCaption: "Display in run process button list",
		OpenInDesignerButtonCaption: "Open in designer",
		VersionsTabCaption: "Process versions",
		SubProcessTabCaption: "Sub-processes",
		SubProcessDetailCaption: "Sub-processes",
		SubProcessInProcessDetailCaption: "Used as subprocess in processes",
		ProcessInDetailsDetailCaption: "Launch from details",
		ProcessInModulesDetailCaption: "Launch from sections",
		ProcessPropertiesDisableProcess: "Deactivate process",
		ProcessPropertiesEnableProcess: "Activate process",
		ProcessStartEventCaption: "Launch by signals",
		IsTracingCaption: "Trace enabled",
		TracingInitException: "Some data were not received at the opening of the page. Please refresh the page",
		TracingSaveException: "The error occurred while saving the record. Please try again",
		IsTracingInfo: "When you turn on a process trace, application performance may be slowed down"
	};
	var localizableImages = {
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseVwProcessLibPageV2",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseVwProcessLibPageV2",
				resourceItemName: "CloseButtonImage",
				hash: "511593df65946d88744783400c622cdb",
				resourceItemExtension: ".png"
			}
		},
		TagButtonIcon: {
			source: 3,
			params: {
				schemaName: "BaseVwProcessLibPageV2",
				resourceItemName: "TagButtonIcon",
				hash: "749c444773b4d39e64c4f6938fdf6d76",
				resourceItemExtension: ".svg"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseVwProcessLibPageV2",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseVwProcessLibPageV2",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "BaseVwProcessLibPageV2",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "BaseVwProcessLibPageV2",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		OpenChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "BaseVwProcessLibPageV2",
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